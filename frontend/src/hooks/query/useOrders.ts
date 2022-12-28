import { useQuery } from "@tanstack/react-query";

import { getAllOrder } from "../../services/order.service";

export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrder,
    staleTime: 10 * 1000, // 1 minute
  });
