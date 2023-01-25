import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export const useGetTopList = () => {
  const queryKey = "top";

  const { data, isError, isLoading } = useQuery([queryKey], async () => {
    return await axios.get("/TopList").then((res) => res.data);
  });

  return {
    data,
    isError,
    isLoading,
  };
};

export const useGetBottomList = () => {
  const queryKey = "bottom";

  const { data, isError, isLoading } = useQuery([queryKey], async () => {
    return await axios.get("/BottomList").then((res) => res.data);
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
export const useSaveItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isSuccess } = useMutation(
    async (itemList: any) => {
      return await axios
        .post("/user/save/item", { itemList })
        .then((res) => res.data);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(["userData"]);
      },
    }
  );

  return {
    mutate,
    isSuccess,
  };
};
