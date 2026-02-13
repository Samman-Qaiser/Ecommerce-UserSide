import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

class OrderService {
  constructor() {
    this.collectionName = "orders";
    this.counterDoc = "orderCounter"; // For sequential order numbers
  }

  /**
   * Generate sequential order number (ORD-1000, ORD-1001, etc.)
   */
  async generateOrderNumber() {
    try {
      const counterRef = doc(db, "metadata", this.counterDoc);
      const counterSnap = await getDoc(counterRef);

      let orderCount = 1000; // Start from ORD-1000

      if (counterSnap.exists()) {
        orderCount = counterSnap.data().lastOrderNumber + 1;
      }

      // Update counter
      await setDoc(counterRef, { lastOrderNumber: orderCount });

      return `ORD-${orderCount}`;
    } catch (error) {
      console.error("Error generating order number:", error);
      // Fallback to timestamp-based
      return `ORD-${Date.now()}`;
    }
  }

  /**
   * Create new order
   */
  async createOrder(orderData) {
    try {
      const orderNumber = await this.generateOrderNumber();
      const orderRef = doc(db, this.collectionName, orderNumber);

      const order = {
        orderNumber,
        userId: orderData.userId, // Guest ID ya Auth UID

        // Items with product snapshots
        items: orderData.items.map((item) => ({
          productId: item.id || item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),

        // Shipping Address
        address: {
          street: orderData.address.street || "",
          city: orderData.address.city || "",
          state: orderData.address.state || "",
          zipcode: orderData.address.zipcode || orderData.address.zip || "",
          country: orderData.address.country || "Pakistan",
        },

        // Order Note
        orderNote: orderData.orderNote || "",

        // Payment Details
        paymentMethod: orderData.paymentMethod || "cod", // 'cod' or 'prepaid'
        paymentStatus: "pending", // 'pending', 'paid', 'failed'
        stripePaymentId: orderData.stripePaymentId || "",

        // Pricing
        subtotal: orderData.subtotal || 0,
        shippingCost: orderData.shippingCost || 0,
        discount: orderData.discount || "",
        total: orderData.total || 0,

        // Order Status
        status: "pending", // 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
        trackingNumber: "",

        // Timestamps
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        deliveredAt: null,
      };

      await setDoc(orderRef, order);

      console.log("✅ Order created successfully:", orderNumber);
      return { orderNumber, ...order };
    } catch (error) {
      console.error("❌ Error creating order:", error);
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  /**
   * Get order by order number
   */
  async getOrderByNumber(orderNumber) {
    try {
      const orderRef = doc(db, this.collectionName, orderNumber);
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists()) {
        return { orderNumber, ...orderSnap.data() };
      }

      return null;
    } catch (error) {
      console.error("Error getting order:", error);
      throw new Error(`Failed to get order: ${error.message}`);
    }
  }

  /**
   * Get all orders for a user
   */
  async getUserOrders(userId) {
    try {
      if (!userId) return [];

      const ordersRef = collection(db, this.collectionName);
      const q = query(
        ordersRef,
        where("userId", "==", userId),
      
      );

      const querySnapshot = await getDocs(q);
      const orders = [];

      querySnapshot.forEach((doc) => {
        orders.push({ orderNumber: doc.id, ...doc.data() });
      });

      return orders;
    } catch (error) {
      console.error("Error getting user orders:", error);
      throw new Error(`Failed to get user orders: ${error.message}`);
    }
  }

  /**
   * 🔥 CRITICAL: Update userId in all orders (for guest-to-auth migration)
   */
  async updateOrdersUserId(oldUserId, newUserId) {
    try {
      console.log(`🔄 Updating orders from ${oldUserId} to ${newUserId}...`);

      const ordersRef = collection(db, this.collectionName);
      const q = query(ordersRef, where("userId", "==", oldUserId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No orders found for this user");
        return 0;
      }

      const batch = writeBatch(db);
      let updateCount = 0;

      querySnapshot.forEach((docSnap) => {
        const orderRef = doc(db, this.collectionName, docSnap.id);
        batch.update(orderRef, {
          userId: newUserId,
          updatedAt: serverTimestamp(),
        });
        updateCount++;
      });

      await batch.commit();
      console.log(`✅ Updated ${updateCount} orders to new userId`);
      return updateCount;
    } catch (error) {
      console.error("Error updating orders userId:", error);
      throw new Error(`Failed to update orders userId: ${error.message}`);
    }
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderNumber, status, trackingNumber = "") {
    try {
      const orderRef = doc(db, this.collectionName, orderNumber);

      const updates = {
        status,
        updatedAt: serverTimestamp(),
      };

      if (trackingNumber) {
        updates.trackingNumber = trackingNumber;
      }

      if (status === "delivered") {
        updates.deliveredAt = serverTimestamp();
      }

      await updateDoc(orderRef, updates);

      console.log(`✅ Order ${orderNumber} status updated to: ${status}`);
      return true;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw new Error(`Failed to update order status: ${error.message}`);
    }
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(orderNumber, paymentStatus, stripePaymentId = "") {
    try {
      const orderRef = doc(db, this.collectionName, orderNumber);

      const updates = {
        paymentStatus,
        updatedAt: serverTimestamp(),
      };

      if (stripePaymentId) {
        updates.stripePaymentId = stripePaymentId;
      }

      await updateDoc(orderRef, updates);

      console.log(`✅ Order ${orderNumber} payment status: ${paymentStatus}`);
      return true;
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw new Error(`Failed to update payment status: ${error.message}`);
    }
  }

  /**
   * Cancel order
   */
  async cancelOrder(orderNumber) {
    try {
      const orderRef = doc(db, this.collectionName, orderNumber);

      await updateDoc(orderRef, {
        status: "cancelled",
        updatedAt: serverTimestamp(),
      });

      console.log(`✅ Order ${orderNumber} cancelled`);
      return true;
    } catch (error) {
      console.error("Error cancelling order:", error);
      throw new Error(`Failed to cancel order: ${error.message}`);
    }
  }
}

export const orderService = new OrderService();
export default orderService;