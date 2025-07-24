import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import LoadingSpinner from "../CustomComponents/LoadingSpinner";
import UnifiedCard from "../CustomComponents/UnifiedCard";

export default function Brands() {
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: "AllBrands",
    queryFn: getAllBrands,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <>
        <div className="text-center p-5">
          <h3 className="text-muted">No Brands found.</h3>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.data.data.map((brand) => (
            <UnifiedCard
              key={brand._id}
              image={brand.image}
              title={brand.name}
              className="mx-auto"
            />
          ))}
        </div>
      </div>
    </>
  );
}
