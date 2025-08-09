import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Layout from "./Components/Layout/Layout";
import AuthContext from "./Context/AuthContext";
import CartContextProvider from "./Context/CartContext";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Payment from "./Components/Payment/payment";
import Profile from "./Components/Profile/Profile";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import ProductDetails from "./Components/Products/ProductDetails";
import SessionExpiredPopup from "./Components/SessionExpired/SessionExpiredPopup";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import WishList from "./Components/WishList/WishList";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Home from "./Components/Home/Home";
import AllOrders from "./Components/AllOrders/AllOrders";
// import { Offline } from "react-detect-offline";

const route = createBrowserRouter([
  {
    path: "",
    element: <Layout />,

    children: [
      {
        index: "/",
        element: (
          <SessionExpiredPopup>
            <Home />
          </SessionExpiredPopup>
        ),
      },

      {
        path: "home",
        element: (
          <SessionExpiredPopup>
            <Home />
          </SessionExpiredPopup>
        ),
      },

      {
        path: "products",
        element: (
          <SessionExpiredPopup>
            <Products />
          </SessionExpiredPopup>
        ),
      },

      {
        path: "productDetails/:id",
        element: (
          <SessionExpiredPopup>
            <ProductDetails />
          </SessionExpiredPopup>
        ),
      },

      {
        path: "categories",
        element: (
          <SessionExpiredPopup>
            <Categories />
          </SessionExpiredPopup>
        ),
      },

      {
        path: "brands",
        element: (
          <SessionExpiredPopup>
            <Brands />
          </SessionExpiredPopup>
        ),
      },

      {
        path: "allorders",
        element: (
          <SessionExpiredPopup>
            <AllOrders />
          </SessionExpiredPopup>
        ),
      },

      {
        path: "cart",
        element: (
          <SessionExpiredPopup>
            <Cart />
          </SessionExpiredPopup>
        ),
      },

      {
        path: "wishlist",
        element: (
          <SessionExpiredPopup>
            <WishList />
          </SessionExpiredPopup>
        ),
      },

      {
        path: "profile",
        element: (
          <SessionExpiredPopup>
            <Profile />
          </SessionExpiredPopup>
        ),
      },

      {
        path: "payment",
        element: (
          <SessionExpiredPopup>
            <Payment />
          </SessionExpiredPopup>
        ),
      },

      {
        path: "resetpassword",
        element: (
          <SessionExpiredPopup>
            <ResetPassword />
          </SessionExpiredPopup>
        ),
      },

      { path: "forgetpassword", element: <ForgetPassword /> },

      { path: "register", element: <Register /> },

      { path: "login", element: <Login /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

const reactQuery = new QueryClient();

export default function App() {
  return (
    <>
      <AuthContext>
        <QueryClientProvider client={reactQuery}>
          <CartContextProvider>
            <RouterProvider router={route} />
          </CartContextProvider>
        </QueryClientProvider>
      </AuthContext>

      {/* <Offline>
        <div className="bg-black p-5 bottom-5 rounded-xl fixed top-0 left-5 text-center text-white">
          <h1>You are offline</h1>
        </div>
      </Offline> */}

      <ToastContainer />
    </>
  );
}
