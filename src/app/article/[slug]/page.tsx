import { notFound } from "next/navigation";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { EnglishArticle } from "@/types/article";

export const dynamic = "force-dynamic";

async function getEnglishArticle(slug: string): Promise<EnglishArticle | null> {
  const articlesRef = collection(db, "english_articles");
  const articleQuery = query(
    articlesRef,
    where("slug", "==", slug),
    where("status", "==", "published"),
    limit(1),
  );

  const snapshot = await getDocs(articleQuery);
  const document = snapshot.docs[0];
  if (!document) return null;

  return { id: document.id, ...document.data() } as EnglishArticle;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getEnglishArticle(slug);

  if (!article) notFound();

  return (
    <main className="article-page">
      <article>
        <p className="eyebrow">{article.category || "News"}</p>
        <h1>{article.title}</h1>
        {article.excerpt ? <p className="lead">{article.excerpt}</p> : null}
        <p className="meta">
          {article.authorName ? `By ${article.authorName}` : "Dainik Jahan English"}
          {article.sourceName ? ` · Source: ${article.sourceName}` : ""}
        </p>
        {article.imageUrl ? (
          <img src={article.imageUrl} alt="" className="article-image" />
        ) : null}
        <div className="article-content">
          {(article.content || "").split(/\n\s*\n/).map((paragraph, index) => (
            <p key={`${article.id}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
