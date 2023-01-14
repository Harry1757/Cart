import { useMutation, useQuery } from "react-query";
import axios from "axios";

export const useGetProductList = () => {
  const queryKey = "productList";

  const { data, isError, isLoading } = useQuery([queryKey], async () => {
    return await axios.get("/productList").then((res) => res.data);
  });

  return {
    data,
    isError,
    isLoading,
  };
};

export const useGetUserData = () => {
  const queryKey = "userData";
  const { data, isError, isLoading } = useQuery([queryKey], async () => {
    return await axios.get("/user").then((res) => res.data);
  });

  return {
    data,
    isError,
    isLoading,
  };
};
