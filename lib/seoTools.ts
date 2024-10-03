import { Search, BarChart, Globe, Link as LinkIcon, FileText, Zap } from "lucide-react"

export type CategoryType = 'Keyword Research' | 'Analytics' | 'On-Page SEO' | 'Link Building' | 'Technical SEO' | 'Local SEO'

export interface Tool {
  name: string;
  description: string;
  link: string;
  category: CategoryType;
  slug: string;
}

export interface Category {
  category: CategoryType;
  tools: Tool[];
}

export const seoTools = [
  {
    category: 'Keyword Research' as CategoryType,
    icon: Search,
    tools: [
      { name: "Google Keyword Planner", description: "Free keyword research tool by Google", link: "https://ads.google.com/home/tools/keyword-planner/" },
      { name: "Ahrefs Keywords Explorer", description: "Comprehensive keyword research tool", link: "https://ahrefs.com/keywords-explorer" },
      { name: "SEMrush", description: "All-in-one marketing toolkit with strong keyword features", link: "https://www.semrush.com/" },
      { name: "Ubersuggest", description: "Neil Patel's free keyword suggestion tool", link: "https://neilpatel.com/ubersuggest/" },
      { name: "KeywordTool.io", description: "Free alternative to Google Keyword Planner", link: "https://keywordtool.io/" },
    ]
  },
  {
    category: 'Analytics' as CategoryType,
    icon: BarChart,
    tools: [
      { name: "Google Analytics", description: "Free web analytics service by Google", link: "https://analytics.google.com/" },
      { name: "Matomo", description: "Open-source analytics platform", link: "https://matomo.org/" },
      { name: "Plausible", description: "Simple and privacy-friendly analytics", link: "https://plausible.io/" },
      { name: "Hotjar", description: "Behavior analytics and user feedback tool", link: "https://www.hotjar.com/" },
      { name: "Mixpanel", description: "Product analytics for mobile and web", link: "https://mixpanel.com/" },
    ]
  },
  {
    category: 'On-Page SEO' as CategoryType,
    icon: FileText,
    tools: [
      { name: "Yoast SEO", description: "WordPress plugin for on-page optimization", link: "https://yoast.com/wordpress/plugins/seo/" },
      { name: "Screaming Frog", description: "Website crawler and SEO tool", link: "https://www.screamingfrog.co.uk/seo-spider/" },
      { name: "SEOquake", description: "Browser extension for on-page analysis", link: "https://www.seoquake.com/" },
      { name: "Moz On-Page Grader", description: "Free tool to grade your on-page SEO", link: "https://moz.com/tools/on-page-grader" },
      { name: "SEMrush On Page SEO Checker", description: "Tool to audit your website's on-page health", link: "https://www.semrush.com/on-page-seo/" },
    ]
  },
  {
    category: 'Backlink Analysis' as CategoryType,
    icon: LinkIcon,
    tools: [
      { name: "Moz Link Explorer", description: "Backlink analysis and link building tool", link: "https://moz.com/link-explorer" },
      { name: "Majestic", description: "Backlink checker and site explorer", link: "https://majestic.com/" },
      { name: "Ahrefs Site Explorer", description: "Backlink checker and competitor analysis", link: "https://ahrefs.com/site-explorer" },
      { name: "SEMrush Backlink Analytics", description: "Comprehensive backlink analysis tool", link: "https://www.semrush.com/analytics/backlinks/" },
      { name: "LinkMiner", description: "Chrome extension for finding broken links", link: "https://chrome.google.com/webstore/detail/linkminer/ogdhdnpiclkaeicicamopfohidjokoom" },
    ]
  },
  {
    category: 'Technical SEO' as CategoryType,
    icon: Zap,
    tools: [
      { name: "Google Search Console", description: "Free service to monitor search performance", link: "https://search.google.com/search-console" },
      { name: "GTmetrix", description: "Website speed and performance optimization", link: "https://gtmetrix.com/" },
      { name: "PageSpeed Insights", description: "Google's tool for performance analysis", link: "https://developers.google.com/speed/pagespeed/insights/" },
      { name: "Schema Markup Generator", description: "Tool to create schema markup for rich snippets", link: "https://technicalseo.com/tools/schema-markup-generator/" },
      { name: "Robots.txt Generator", description: "Create and validate your robots.txt file", link: "https://www.robotstxt.org/generator.html" },
    ]
  },
  {
    category: 'Local SEO' as CategoryType,
    icon: Globe,
    tools: [
      { name: "Google My Business", description: "Manage your business presence on Google", link: "https://www.google.com/business/" },
      { name: "Moz Local", description: "Distribute business information to directories", link: "https://moz.com/products/local" },
      { name: "BrightLocal", description: "Local SEO tools and citation builder", link: "https://www.brightlocal.com/" },
      { name: "Yext", description: "Digital knowledge management platform", link: "https://www.yext.com/" },
      { name: "Whitespark Local Citation Finder", description: "Find and build local citations", link: "https://whitespark.ca/local-citation-finder/" },
    ]
  },
]