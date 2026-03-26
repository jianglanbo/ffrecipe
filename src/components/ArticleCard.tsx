import Link from "next/link";
import { ArticleFrontMatter } from "@/lib/types";

interface ArticleCardProps {
  article: ArticleFrontMatter;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/${article.category}/${article.slug}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-blue-200 transition-all"
    >
      {article.image && (
        <div className="aspect-video bg-gray-100 relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {article.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          {article.featured && (
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
              Featured
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{article.author}</span>
          <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  );
}
