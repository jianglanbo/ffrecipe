# FFRecipe - Insurance Guides & Reviews

A static content website for insurance information, built with Next.js 14 and deployed on Vercel.

## 🌐 Live Site

- **URL**: https://ffrecipe.com
- **CMS**: https://ffrecipe.com/admin

## 📁 Project Structure

```
ffrecipe/
├── content/              # MDX articles by category
│   ├── life-insurance/
│   ├── health-insurance/
│   ├── auto-insurance/
│   ├── home-insurance/
│   ├── guides/
│   └── blog/
├── public/
│   ├── admin/           # Decap CMS config
│   └── images/          # Article images
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   └── lib/             # Utilities & types
└── scripts/
    └── generate-content.js  # AI content generator
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## ✍️ Content Management

### Using Decap CMS

1. Visit `https://ffrecipe.com/admin`
2. Login with GitHub
3. Create/Edit articles in the visual editor

### Using AI Content Generator

```bash
# Generate all sample articles
node scripts/generate-content.js --all

# Generate single article
node scripts/generate-content.js --category life-insurance --topic "Your Topic"
```

## 📝 Adding New Articles

Create a new `.mdx` file in the appropriate category folder:

```mdx
---
title: "Your Article Title"
slug: "your-article-title"
description: "A brief description of the article"
category: "life-insurance"
author: "FFRecipe Team"
date: "2024-03-26T00:00:00.000Z"
lastModified: "2024-03-26T00:00:00.000Z"
tags: ["tag1", "tag2"]
featured: false
---

# Your Article Title

Content goes here...
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Content**: MDX with next-mdx-remote
- **CMS**: Decap CMS (formerly Netlify CMS)
- **Deployment**: Vercel

## 📦 Deployment

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables (if needed)
4. Deploy!

## 🔧 Environment Variables

None required for static generation.

## 📄 License

MIT
