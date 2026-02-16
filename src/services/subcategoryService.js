import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit
} from "firebase/firestore";
import { db } from '../firebase/firebaseconfig';

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

  // GET BEST SELLER
  getbestSeller: async () => {
    const q = query(
      collection(db, 'subcategories'),
      where('badge', '==', 'Best Seller'),
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },
  //GET Top Rated
  gettopRated: async () => {
    const q = query(
      collection(db, 'subcategories'),
      where('badge', '==', 'Top Rated'),
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // GET FEATURED
  getFeatured: async () => {
    try {
      console.log('🔍 Fetching featured subcategories...');
      
      const snapshot = await getDocs(collection(db, 'subcategories'));
      
      console.log('📊 Total subcategories:', snapshot.size);
      
      const allSubCats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      allSubCats.forEach(subCat => {
        console.log(`${subCat.name}:`, {
          isFeatured: subCat.isFeatured,
          type: typeof subCat.isFeatured,
          isActive: subCat.isActive
        });
      });
      
      const featured = allSubCats.filter(subCat => {
        const isFeaturedCheck = subCat.isFeatured === true;
        const isActiveCheck = subCat.isActive === true;
        
        if (isFeaturedCheck) {
          console.log(`✅ Featured found: ${subCat.name}`);
        }
        
        return isFeaturedCheck && isActiveCheck;
      });
      
      console.log('⭐ Featured count:', featured.length);
      
      featured.sort((a, b) => {
        const orderA = a.featuredOrder || 999;
        const orderB = b.featuredOrder || 999;
        return orderA - orderB;
      });
      
      return featured.slice(0, 6);
      
    } catch (error) {
      console.error('❌ Error fetching featured subcategories:', error);
      throw error;
    }
  },

  // GET BY ID
  getById: async (id) => {
    const docSnap = await getDoc(doc(db, "subcategories", id));
    if (!docSnap.exists()) throw new Error("SubCategory not found");
    return { id: docSnap.id, ...docSnap.data() };
  },

  // ⭐ NEW: GET BY SLUG
  getBySlug: async (slug) => {
    try {
      console.log('🔍 Fetching subcategory by slug:', slug);
      
      const q = query(
        collection(db, 'subcategories'),
        where('slug', '==', slug),
        limit(1)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        throw new Error(`SubCategory with slug "${slug}" not found`);
      }
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      console.error('❌ Error fetching subcategory by slug:', error);
      throw error;
    }
  },

  //  NEW: GET BY NAME
  getByName: async (name) => {
    try {
      console.log('🔍 Fetching subcategory by name:', name);
      
      const q = query(
        collection(db, 'subcategories'),
        where('name', '==', name),
        limit(1)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        throw new Error(`SubCategory with name "${name}" not found`);
      }
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      console.error('❌ Error fetching subcategory by name:', error);
      throw error;
    }
  },
}