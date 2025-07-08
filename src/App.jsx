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

const route = createBrowserRouter([
  {
    path: "",
    element: <Layout />,

    children: [
      { index: true, element: <Products /> },

      {
        path: "products",
        element: (
          <SessionExpiredPopup>
            <Products />
          </SessionExpiredPopup>
        ),
      },

      { path: "register", element: <Register /> },

      { path: "login", element: <Login /> },

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

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <AuthContext>
        <RouterProvider router={route} />
      </AuthContext>

      <ToastContainer style={{ marginTop: "80px" }} />
    </>
  );
}
