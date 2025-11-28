import { Helmet } from "react-helmet";
import Products from "../Products/Products";
import SimpleSlider from "../Slider/HomeSlider";
import GroceryShop from "../GroceryShop/GroceryShop";
import InformationHome from "./../InformationHome/InformationHome";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  let getUserToken = localStorage.getItem("token");
  let { id } = jwtDecode(getUserToken);
  localStorage.setItem("userId", id);

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="mt-4">
          <SimpleSlider />
        </div>

        <CategoriesSlider />
        <h2 className="text-lg font-semibold px-4 py-3">Popular Products</h2>

        <Products />
        <Helmet>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Explore FreshCart for farm-fresh produce, groceries, and more. Shop now for quality ingredients!"
          />
          <title>Fresh Cart E-Commerce</title>
        </Helmet>

        <GroceryShop />

        <InformationHome />
      </div>
    </>
  );
}
