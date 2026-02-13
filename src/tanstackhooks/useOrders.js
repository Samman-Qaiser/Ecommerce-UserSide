import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { orderService } from "../services/ordersService";

export const useOrder = () => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.auth);

  /**
   * Fetch user orders
   */
  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.uid],
    queryFn: () => orderService.getUserOrders(user?.uid),
    enabled: !!user?.uid,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  /**
   * Create new order
   */
  const createOrder = useMutation({
    mutationFn: (orderData) => orderService.createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", user?.uid]);
    },
  });

  /**
   * Get single order
   */
  const getOrder = async (orderNumber) => {
    return await orderService.getOrderByNumber(orderNumber);
  };

  /**
   * Update order status
   */
  const updateStatus = useMutation({
    mutationFn: ({ orderNumber, status, trackingNumber }) =>
      orderService.updateOrderStatus(orderNumber, status, trackingNumber),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", user?.uid]);
    },
  });

  /**
   * Update payment status
   */
  const updatePayment = useMutation({
    mutationFn: ({ orderNumber, paymentStatus, stripePaymentId }) =>
      orderService.updatePaymentStatus(orderNumber, paymentStatus, stripePaymentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", user?.uid]);
    },
  });

  /**
   * Cancel order
   */
  const cancelOrder = useMutation({
    mutationFn: (orderNumber) => orderService.cancelOrder(orderNumber),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", user?.uid]);
    },
  });

  return {
    orders: orders || [],
    isLoading,
    error,
    refetch,
    createOrder,
    getOrder,
    updateStatus,
    updatePayment,
    cancelOrder,
  };
};