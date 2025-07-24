import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function UseAllCategories() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const res = useQuery({
    queryKey: "AllCategories",
    queryFn: getAllCategories,
  });

  return res;
}
