// Content types for ffrecipe.com

export interface ArticleFrontMatter {
  title: string;
  slug: string;
  description: string;
  category: 'life-insurance' | 'health-insurance' | 'auto-insurance' | 'home-insurance' | 'guides' | 'blog';
  author: string;
  date: string;
  lastModified: string;
  tags: string[];
  featured?: boolean;
  image?: string;
  readingTime?: number;
}

export interface Article extends ArticleFrontMatter {
  content: string;
}

export interface CategoryInfo {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    name: 'Life Insurance',
    slug: 'life-insurance',
    description: 'Comprehensive guides on term life, whole life, and universal life insurance policies.',
    icon: '🛡️'
  },
  {
    name: 'Health Insurance',
    slug: 'health-insurance',
    description: 'Everything you need to know about health coverage, Medicare, and Medicaid.',
    icon: '🏥'
  },
  {
    name: 'Auto Insurance',
    slug: 'auto-insurance',
    description: 'Compare auto insurance rates and learn about coverage options.',
    icon: '🚗'
  },
  {
    name: 'Home Insurance',
    slug: 'home-insurance',
    description: 'Protect your home with the right homeowners or renters insurance.',
    icon: '🏠'
  },
  {
    name: 'Insurance Guides',
    slug: 'guides',
    description: 'Step-by-step guides to help you make informed insurance decisions.',
    icon: '📚'
  },
  {
    name: 'Blog',
    slug: 'blog',
    description: 'Latest news, trends, and insights in the insurance industry.',
    icon: '📝'
  }
];
