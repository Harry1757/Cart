import React from "react";
import { getProductList } from "../react-query/productList";

export const ProductList = () => {
  const { data, isError, isLoading } = getProductList();
  console.log(data);
  return <div></div>;
};
