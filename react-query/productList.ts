import { useMutation, useQuery } from "react-query";
import axios from "axios";

export const getProductList = async () => {
  const queryKey = "productList";

  const { data, isError, isLoading } = useQuery(
    [queryKey, "test"],
    async () => {
      return await axios.get("/users").then((res) => res.data);
    }
  );
  console.log(data, isError, isLoading);

  return {
    data,
    isError,
    isLoading,
  };
};
