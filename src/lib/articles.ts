import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article, ArticleFrontMatter, CATEGORIES } from './types';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllArticles(): ArticleFrontMatter[] {
  const articles: ArticleFrontMatter[] = [];
  
  CATEGORIES.forEach(category => {
    const categoryPath = path.join(contentDirectory, category.slug);
    
    if (fs.existsSync(categoryPath)) {
      const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.mdx'));
      
      files.forEach(file => {
        const filePath = path.join(categoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        articles.push(data as ArticleFrontMatter);
      });
    }
  });
  
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticlesByCategory(category: string): ArticleFrontMatter[] {
  const categoryPath = path.join(contentDirectory, category);
  
  if (!fs.existsSync(categoryPath)) {
    return [];
  }
  
  const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.mdx'));
  
  return files.map(file => {
    const filePath = path.join(categoryPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    return data as ArticleFrontMatter;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(category: string, slug: string): Article | null {
  const filePath = path.join(contentDirectory, category, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  return {
    ...(data as ArticleFrontMatter),
    content
  };
}

export function getFeaturedArticles(limit: number = 5): ArticleFrontMatter[] {
  return getAllArticles()
    .filter(article => article.featured)
    .slice(0, limit);
}

export function getLatestArticles(limit: number = 10): ArticleFrontMatter[] {
  return getAllArticles().slice(0, limit);
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
