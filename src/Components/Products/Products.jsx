import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import SimpleSlider from "../Slider/HomeSlider";
import LoadingSpinner from "../CustomComponents/LoadingSpinner";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import UnifiedCard from "../CustomComponents/UnifiedCard";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { cartContext } from "../../Context/CartContext";

export default function Products() {
  const { addCart } = useContext(cartContext);

  async function handelAddCart(id) {
    const resMass = await addCart(id);

    if (resMass) {
      toast.success("Product added Successfully");
    } else {
      toast.error("Adding Product Error");
    }
  }

  function fetchProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: "allProducts",
    queryFn: fetchProduct,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <>
        <div className="text-center p-5">
          <h3 className="text-muted">No Products found.</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="mt-4 rounded-xl overflow-hidden">
          <SimpleSlider />
        </div>

        <div className="h-1/4 w-full mt-4">
          <CategoriesSlider />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 pb-4">
          {data.data.data.map((pro) => (
            <div className="relative group" key={pro._id}>
              <span
                onClick={() => handelAddCart(pro._id)}
                className="absolute top-0 right-3 z-10 hidden group-hover:flex items-center justify-center w-8 h-8 bg-emerald-400 text-white rounded-full shadow-lg cursor-pointer transition-opacity duration-200"
              >
                <i className="fa-solid fa-plus"></i>
              </span>
              <Link to={`/productDetails/${pro._id}`} className="block">
                <UnifiedCard
                  image={pro.imageCover}
                  title={pro.title.split(" ").slice(0, 2).join(" ")}
                  className="mx-auto"
                >
                  <p className="text-emerald-500 font-semibold mb-1">
                    {pro.category.name}
                  </p>
                  <div className="flex justify-between items-center w-full mt-2">
                    <span className="text-gray-900">
                      {pro.priceAfterDiscount ? (
                        <>
                          <span className="text-red-500 line-through text-sm me-2">
                            {pro.price}
                          </span>
                          {pro.priceAfterDiscount} EGP
                        </>
                      ) : (
                        `${pro.price} EGP`
                      )}
                    </span>
                    <span className="text-yellow-500 font-bold">
                      <i className="fa-solid fa-star me-1"></i>
                      {pro.ratingsAverage}
                    </span>
                  </div>
                </UnifiedCard>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
