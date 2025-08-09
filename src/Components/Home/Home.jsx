import React from "react";
import { Helmet } from "react-helmet";
import Products from "../Products/Products";
import SimpleSlider from "../Slider/HomeSlider";
import GroceryShop from "../GroceryShop/GroceryShop";
import InformationHome from "./../InformationHome/InformationHome";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Explore FreshCart for farm-fresh produce, groceries, and more. Shop now for quality ingredients!"
        />
        <title>Home</title>
      </Helmet>

      <div className="container mx-auto px-4">
        <SimpleSlider />

        <CategoriesSlider />
        <h2 className="text-lg font-semibold mb-3">Popular Products</h2>

        <Products />

        <GroceryShop />

        <InformationHome />
      </div>
    </>
  );
}
