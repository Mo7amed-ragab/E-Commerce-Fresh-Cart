import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./Components/Layout/Layout";
import AuthContext from "./Context/AuthContext";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import SessionExpiredPopup from "./Components/SessionExpired/SessionExpiredPopup";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { QueryClient, QueryClientProvider } from "react-query";

const route = createBrowserRouter([
  {
    path: "",
    element: <Layout />,

    children: [
      {
        index: true,
        element: (
          <SessionExpiredPopup>
            <Products />
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
        path: "cart",
        element: (
          <SessionExpiredPopup>
            <Cart />
          </SessionExpiredPopup>
        ),
      },

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
          <RouterProvider router={route} />
        </QueryClientProvider>
      </AuthContext>

      <ToastContainer style={{ marginTop: "80px" }} />
    </>
  );
}
