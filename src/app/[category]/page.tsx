import Link from "next/link";
import { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/articles";
import { CATEGORIES } from "@/lib/types";
import ArticleCard from "@/components/ArticleCard";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryInfo = CATEGORIES.find(c => c.slug === category);
  
  return {
    title: categoryInfo?.name || 'Insurance Articles',
    description: categoryInfo?.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryInfo = CATEGORIES.find(c => c.slug === category);
  const articles = getArticlesByCategory(category);

  if (!categoryInfo) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <Link href="/" className="text-blue-600 mt-4 inline-block">Go back home</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Category Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-5xl mb-4">{categoryInfo.icon}</div>
            <h1 className="text-4xl font-bold mb-4">{categoryInfo.name}</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {categoryInfo.description}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles yet in this category.</p>
              <p className="text-gray-400 mt-2">Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
