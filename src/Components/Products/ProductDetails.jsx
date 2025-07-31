import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import LoadingSpinner from "../CustomComponents/LoadingSpinner";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const { addCart } = useContext(cartContext);

  async function handelAddCart(id) {
    const resMass = await addCart(id);

    if (resMass) {
      toast.success("Product added Successfully");
    } else {
      toast.error("Adding Product Error");
    }
  }

  function fetchProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: fetchProductDetails,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <>
        <div className="text-center p-5">
          <h3 className="text-muted">No Product Details found.</h3>
        </div>
      </>
    );
  }

  const objData = data.data.data;

  return (
    <>
      <div className="container mx-auto p-5 flex items-center justify-between">
        <div className="w-1/4">
          <img
            src={objData.imageCover}
            alt={objData.title}
            className="w-full"
          />
        </div>

        <div className="w-[70%] flex gap-2 flex-col">
          <h1>{objData.title}</h1>
          <p>{objData.description}</p>
          <h5>Category : {objData.category.name}</h5>
          <h5>Price : {objData.price}</h5>
          <button
            onClick={() => handelAddCart(objData._id)}
            className="btn btn-success border-white bg-emerald-400 w-full"
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
