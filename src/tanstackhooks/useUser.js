import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { userService } from "../services/userService";

export const useUser = () => {
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  /**
   * Fetch user data
   */
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.uid],
    queryFn: () => userService.getUserById(user?.uid),
    enabled: !!user?.uid,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  /**
   * Update user profile
   */
  const updateProfile = useMutation({
    mutationFn: (updates) => userService.updateUserProfile(user?.uid, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user?.uid]);
    },
  });

  /**
   * Add address
   */
  const addAddress = useMutation({
    mutationFn: (address) => userService.addAddress(user?.uid, address),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user?.uid]);
    },
  });

  /**
   * Link order to user
   */
  const linkOrder = useMutation({
    mutationFn: (orderId) => userService.linkOrderToUser(user?.uid, orderId),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user?.uid]);
    },
  });

  /**
   * Check if email exists
   */
  const checkEmailExists = async (email) => {
    return await userService.emailExists(email);
  };

  return {
    user: userData || user,
    isAuthenticated,
    isLoading,
    error,
    refetch,
    updateProfile,
    addAddress,
    linkOrder,
    checkEmailExists,
  };
};