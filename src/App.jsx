import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import AuthContext from "./Context/AuthContext";
import CartContextProvider from "./Context/CartContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Eager load critical components
import Layout from "./Components/Layout/Layout";
import SessionExpiredPopup from "./Components/SessionExpired/SessionExpiredPopup";

// Lazy load all other components
const Home = lazy(() => import("./Components/Home/Home"));
const Login = lazy(() => import("./Components/Login/Login"));
const Register = lazy(() => import("./Components/Register/Register"));
const NotFound = lazy(() => import("./Components/NotFound/NotFound"));
const Products = lazy(() => import("./Components/Products/Products"));
const Categories = lazy(() => import("./Components/Categories/Categories"));
const Payment = lazy(() => import("./Components/Payment/Payment"));
const Profile = lazy(() => import("./Components/Profile/Profile"));
const Brands = lazy(() => import("./Components/Brands/Brands"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const ProductDetails = lazy(() =>
  import("./Components/Products/ProductDetails")
);
const WishList = lazy(() => import("./Components/WishList/WishList"));
const ResetPassword = lazy(() =>
  import("./Components/ResetPassword/ResetPassword")
);
const ForgetPassword = lazy(() =>
  import("./Components/ForgetPassword/ForgetPassword")
);
const AllOrders = lazy(() => import("./Components/AllOrders/AllOrders"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"></div>
  </div>
);

const route = createBrowserRouter([
  {
    path: "",
    element: <Layout />,

    children: [
      {
        index: "/",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SessionExpiredPopup>
              <Home />
            </SessionExpiredPopup>
          </Suspense>
        ),
      },

      {
        path: "home",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SessionExpiredPopup>
              <Home />
            </SessionExpiredPopup>
          </Suspense>
        ),
      },

      {
        path: "products",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SessionExpiredPopup>
              <Products />
            </SessionExpiredPopup>
          </Suspense>
        ),
      },

      {
        path: "productDetails/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SessionExpiredPopup>
              <ProductDetails />
            </SessionExpiredPopup>
          </Suspense>
        ),
      },

      {
        path: "categories",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SessionExpiredPopup>
              <Categories />
            </SessionExpiredPopup>
          </Suspense>
        ),
      },

      {
        path: "brands",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SessionExpiredPopup>
              <Brands />
            </SessionExpiredPopup>
          </Suspense>
        ),
      },

      {
        path: "allorders",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SessionExpiredPopup>
              <AllOrders />
            </SessionExpiredPopup>
          </Suspense>
        ),
      },

      {
        path: "cart",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SessionExpiredPopup>
              <Cart />
            </SessionExpiredPopup>
          </Suspense>
        ),
      },

      {
        path: "wishlist",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SessionExpiredPopup>
              <WishList />
            </SessionExpiredPopup>
          </Suspense>
        ),
      },

      {
        path: "profile",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SessionExpiredPopup>
              <Profile />
            </SessionExpiredPopup>
          </Suspense>
        ),
      },

      {
        path: "payment",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SessionExpiredPopup>
              <Payment />
            </SessionExpiredPopup>
          </Suspense>
        ),
      },

      {
        path: "resetpassword",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SessionExpiredPopup>
              <ResetPassword />
            </SessionExpiredPopup>
          </Suspense>
        ),
      },

      {
        path: "forgetpassword",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ForgetPassword />
          </Suspense>
        ),
      },

      {
        path: "register",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Register />
          </Suspense>
        ),
      },

      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        ),
      },

      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        ),
      },
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
