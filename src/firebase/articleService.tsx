// import { db } from './firebase'; 
// import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

// export const getArticles = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, 'articles'));
//     const articles = querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     return articles;
//   } catch (error) {
//     console.error("Error getting articles:", error);
//     throw error;
//   }
// };

// export const getArticleById = async (articleId) => {
//   try {
//     const docRef = doc(db, 'articles', articleId);
//     const docSnap = await getDoc(docRef);
    
//     if (docSnap.exists()) {
//       return {
//         id: docSnap.id,
//         ...docSnap.data()
//       };
//     } else {
//       throw new Error("Article not found");
//     }
//   } catch (error) {
//     console.error("Error getting article:", error);
//     throw error;
//   }
// };