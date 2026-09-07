import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";

export type EnglishArticle = {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  imageUrl?: string;
  category?: string;
  slug?: string;
  publishedAt?: { seconds: number; nanoseconds: number } | null;
};

const ENGLISH_COLLECTION = "english_articles";

export async function getLatestEnglishArticles(max = 24): Promise<EnglishArticle[]> {
  const articlesRef = collection(db, ENGLISH_COLLECTION);
  const articlesQuery = query(
    articlesRef,
    where("status", "==", "published"),
    orderBy("publishedAt", "desc"),
    limit(max),
  );

  const snapshot = await getDocs(articlesQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as EnglishArticle[];
}
