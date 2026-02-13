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
export const subCategoryService = {
    
      // READ ALL - Sare subcategories
      getAll: async () => {
        const q = query(
          collection(db, 'subcategories'),
          orderBy('createdAt', 'desc')
        );
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      },
    
      // READ BY CATEGORY - Specific category ke subcategories
      getByCategory: async (categoryId) => {
        const q = query(
          collection(db, 'subcategories'),
          where('categoryId', '==', categoryId),
          orderBy('name', 'asc')
        );
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      },
    
      // READ ACTIVE - Sirf active subcategories (user-facing)
      getActive: async () => {
        const q = query(
          collection(db, 'subcategories'),
          where('isActive', '==', true),
        
        );
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      },
        getById: async (id) => {
    const docSnap = await getDoc(doc(db, "subcategories", id));
    if (!docSnap.exists()) throw new Error("Category not found");
    return { id: docSnap.id, ...docSnap.data() };
  },
}