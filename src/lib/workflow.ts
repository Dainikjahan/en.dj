import type { ArticleStatus } from "@/types/article";

const transitions: Record<ArticleStatus, readonly ArticleStatus[]> = {
  draft: ["review"],
  review: ["draft", "approved"],
  approved: ["published", "review"],
  published: ["archived"],
  archived: ["draft"],
};

export function canTransitionArticle(
  from: ArticleStatus,
  to: ArticleStatus,
): boolean {
  return transitions[from].includes(to);
}

export function assertArticleTransition(
  from: ArticleStatus,
  to: ArticleStatus,
): void {
  if (!canTransitionArticle(from, to)) {
    throw new Error(`Invalid article transition: ${from} -> ${to}`);
  }
}

export function allowedArticleTransitions(
  status: ArticleStatus,
): readonly ArticleStatus[] {
  return transitions[status];
}
