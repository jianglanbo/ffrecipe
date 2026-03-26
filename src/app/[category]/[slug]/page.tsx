import { Metadata } from "next";
import Link from "next/link";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { CATEGORIES } from "@/lib/types";
import { notFound } from "next/navigation";
import ArticleContent from "@/components/ArticleContent";

interface ArticlePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const paths: { category: string; slug: string }[] = [];
  
  CATEGORIES.forEach((category) => {
    const articles = getArticlesByCategory(category.slug);
    articles.forEach((article) => {
      paths.push({
        category: category.slug,
        slug: article.slug,
      });
    });
  });
  
  return paths;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticleBySlug(category, slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  
  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.lastModified,
      authors: [article.author],
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;
  const article = getArticleBySlug(category, slug);
  const categoryInfo = CATEGORIES.find(c => c.slug === category);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="text-gray-500 hover:text-blue-600">Home</Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href={`/${category}`} className="text-gray-500 hover:text-blue-600">
              {categoryInfo?.name}
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 truncate max-w-xs">{article.title}</li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link
            href={`/${category}`}
            className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100"
          >
            {categoryInfo?.name}
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{article.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 border-b border-gray-100 pb-6">
          <span>By <span className="font-medium text-gray-900">{article.author}</span></span>
          <span>•</span>
          <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          {article.readingTime && (
            <>
              <span>•</span>
              <span>{article.readingTime} min read</span>
            </>
          )}
        </div>
      </header>

      {/* Article Content */}
      <ArticleContent content={article.content} />

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-600">
          <strong>Disclaimer:</strong> The information provided in this article is for general informational purposes only 
          and should not be considered as professional insurance advice. Always consult with a licensed insurance 
          professional before making any decisions regarding your insurance coverage.
        </p>
      </div>
    </div>
  );
}
