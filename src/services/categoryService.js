import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, storage } from '../firebase/firebaseconfig';
export const categoryService = {
  // READ ALL - Same as before
  getAll: async () => {
    const q = query(collection(db, "category"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  // Testing ke liye orderBy hata kar dekhein
  getActive: async () => {
    const q = query(
      collection(db, "category"),
      where("isActive", "==", true),
      // orderBy hata dein temporary
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },
  // READ ONE - Same as before
  getById: async (id) => {
    const docSnap = await getDoc(doc(db, "category", id));
    if (!docSnap.exists()) throw new Error("Category not found");
    return { id: docSnap.id, ...docSnap.data() };
  },
};
