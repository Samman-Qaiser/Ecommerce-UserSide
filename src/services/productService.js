import { db } from "../firebase/firebaseconfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

export const productService = {
  getAll: async (options = {}) => {
    try {
      const {
        pageSize = 20,
        lastDoc = null,
        subCategoryId = null,
        inStock = null,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = options;

      let q = collection(db, "products");
      const constraints = [];

      // Apply filters
      if (subCategoryId) {
        constraints.push(where("subCategoryId", "==", subCategoryId));
      }

      if (inStock !== null) {
        constraints.push(where("inStock", "==", inStock));
      }

      // Apply sorting
      constraints.push(orderBy(sortBy, sortOrder));

      // Apply pagination
      constraints.push(limit(pageSize));

      if (lastDoc) {
        constraints.push(startAfter(lastDoc));
      }

      q = query(q, ...constraints);

      const snapshot = await getDocs(q);

      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate().toISOString(),
      }));

      return {
        products,
        lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
        hasMore: snapshot.docs.length === pageSize,
      };
    } catch (error) {
      console.error("Failed to fetch products:", error);
      throw new Error("Failed to fetch products");
    }
  },

  getById: async (id) => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Product not found");
      }

      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate().toISOString(),
        updatedAt: docSnap.data().updatedAt?.toDate().toISOString(),
      };
    } catch (error) {
      console.error("Failed to fetch product:", error);
      throw error;
    }
  },

  // ⭐ NEW: GET PRODUCTS BY SUBCATEGORY ID
  getBySubCategoryId: async (subCategoryId, options = {}) => {
    try {
      const {
        pageSize = 20,
        lastDoc = null,
        inStock = null,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = options;

      console.log('🔍 Fetching products for subcategory:', subCategoryId);

      const constraints = [
        where("subCategoryId", "==", subCategoryId)
      ];

      if (inStock !== null) {
        constraints.push(where("inStock", "==", inStock));
      }

      constraints.push(orderBy(sortBy, sortOrder));
      constraints.push(limit(pageSize));

      if (lastDoc) {
        constraints.push(startAfter(lastDoc));
      }

      const q = query(collection(db, "products"), ...constraints);
      const snapshot = await getDocs(q);

      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate().toISOString(),
      }));

      console.log('✅ Products found:', products.length);

      return {
        products,
        lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
        hasMore: snapshot.docs.length === pageSize,
      };
    } catch (error) {
      console.error("Failed to fetch products by subcategory:", error);
      throw error;
    }
  },

  search: async (searchTerm) => {
    try {
      const q = query(collection(db, "products"), orderBy("name"), limit(20));

      const snapshot = await getDocs(q);

      const products = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      return products;
    } catch (error) {
      console.error("Search failed:", error);
      throw new Error("Failed to search products");
    }
  },
};