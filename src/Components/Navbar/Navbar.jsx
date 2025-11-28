import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import logo_navbar from "../../assets/images/fresh-cart-logo.svg";

export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  // 1. Destructure both cart and wishlist counts from the context
  const { numOfCart, wishListNumber } = useContext(cartContext);

  const navigate = useNavigate();

  // State to control the visibility of the modal
  const [modal, setModal] = useState(false);

  // Function to toggle the modal
  const toggle = () => setModal(!modal);

  function handelLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
    toggle();
  }

  return (
    <div>
      <nav className="bg-emerald-400 sticky-top">
        <div className="container mx-auto flex items-center justify-between p-3 px-5">
          {/* Left Side: Logo and Main Links */}
          <div className="flex items-center gap-4">
            <Link to="">
              <img src={logo_navbar} alt="Fresh cart" />
            </Link>

            {token && (
              <ul className="hidden md:flex items-center space-x-4">
                <li>
                  <NavLink
                    className="text-gray-800 hover:text-white transition-colors"
                    to="/home"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="text-gray-800 hover:text-white transition-colors"
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="text-gray-800 hover:text-white transition-colors"
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="text-gray-800 hover:text-white transition-colors"
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="text-gray-800 hover:text-white transition-colors"
                    to="/allOrders"
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* Right Side: Icons and Auth Links */}
          <div className="flex items-center gap-4">
            {/* Social Icons (Optional) */}
            <div className="hidden lg:flex items-center gap-3 text-gray-800">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>

            {/* User-specific links */}
            <ul className="flex items-center gap-4 text-gray-800">
              {token ? (
                <>
                  <li>
                    <Link
                      to="wishlist"
                      className="relative"
                      aria-label="View wishlist"
                    >
                      <i className="fa-regular fa-heart text-xl hover:text-white"></i>
                      {/* Use wishListNumber for the badge */}
                      {wishListNumber > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {wishListNumber}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className="relative"
                      aria-label="View shopping cart"
                    >
                      <i className="fa-solid fa-cart-shopping text-xl hover:text-white"></i>
                      {numOfCart > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {numOfCart}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="profile"
                      className="relative"
                      aria-label="View profile"
                    >
                      <i className="fa-regular fa-user text-xl hover:text-white"></i>
                    </Link>
                  </li>
                  <li>
                    <span
                      className="cursor-pointer font-semibold hover:text-white"
                      onClick={toggle}
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/register"
                      className="font-semibold hover:text-white"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className="font-semibold hover:text-white"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle} className="fs-5">
          Logout
        </ModalHeader>
        <ModalBody className="fs-6 font-semibold">
          Are you sure you want to logout?
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-outline-secondary"
            outline
            onClick={toggle}
          >
            Cancel
          </Button>
          <Button color="danger" onClick={handelLogout}>
            Logout
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
