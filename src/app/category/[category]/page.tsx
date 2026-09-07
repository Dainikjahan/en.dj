import Link from "next/link";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { EnglishArticle } from "@/types/article";

export const dynamic = "force-dynamic";

async function getCategoryArticles(category: string): Promise<EnglishArticle[]> {
  const articlesRef = collection(db, "english_articles");
  const articleQuery = query(
    articlesRef,
    where("status", "==", "published"),
    where("category", "==", category),
    orderBy("publishedAt", "desc"),
    limit(24),
  );

  const snapshot = await getDocs(articleQuery);
  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  })) as EnglishArticle[];
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const articles = await getCategoryArticles(category);

  return (
    <main className="category-page">
      <p className="eyebrow">Dainik Jahan English</p>
      <h1>{category}</h1>
      {articles.length === 0 ? (
        <p className="empty-state">No published stories are available in this category yet.</p>
      ) : (
        <section className="article-grid">
          {articles.map((article) => (
            <article className="story-card" key={article.id}>
              <p className="eyebrow">{article.category || category}</p>
              <h2>
                <Link href={`/article/${article.slug}`}>{article.title}</Link>
              </h2>
              {article.excerpt ? <p>{article.excerpt}</p> : null}
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
