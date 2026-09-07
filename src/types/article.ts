export const ARTICLE_STATUSES = [
  "draft",
  "review",
  "approved",
  "published",
  "archived",
] as const;

export type ArticleStatus = (typeof ARTICLE_STATUSES)[number];

export type EnglishArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  imageUrl?: string;
  category?: string;
  authorName?: string;
  sourceName?: string;
  sourceUrl?: string;
  status: ArticleStatus;
  publishedAt?: { seconds: number; nanoseconds: number } | null;
  updatedAt?: { seconds: number; nanoseconds: number } | null;
};
