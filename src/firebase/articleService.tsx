import { db } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

export type Article = {
  id: string;
  title: string;
  author: string;
  authorBio: string;
  excerpt: string;
  imageUrl: string;
  createdAt: Timestamp;
  readTime: string;
  content: any;
};

export const getArticles = async (): Promise<Article[]> => {
  const snapshot = await getDocs(collection(db, "articles"));

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Article, "id">),
  }));
};

export const getArticleById = async (id: string) => {
  const ref = doc(db, "articles", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("Article not found");
  }

  return {
    id: snap.id,
    ...(snap.data() as any),
  };
};
