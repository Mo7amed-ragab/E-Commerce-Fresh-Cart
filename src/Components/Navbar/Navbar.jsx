import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { authContext } from "../../Context/AuthContext";
import logo_navbar from "../../assets/images/fresh-cart-logo.svg";

export default function Navbar() {
  const { token, setToken } = useContext(authContext);
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
    <>
      <nav className="bg-emerald-400">
        <div className="flex items-center justify-between p-3 mx-auto container">
          <div className="flex items-center gap-3">
            <Link to="">
              <img src={logo_navbar} alt="Fresh cart" />
            </Link>

            {token ? (
              <ul className="flex items-center space-x-4">
                <li>
                  <NavLink to="/products">Products</NavLink>
                </li>

                <li>
                  <NavLink to="/categories">Categories</NavLink>
                </li>

                <li>
                  <NavLink to="/brands">Brands</NavLink>
                </li>

                <li>
                  <NavLink to="/cart">Cart</NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>

          <div className="flex items-center gap-5">
            <ul className="flex items-center gap-2">
              <li>
                <i className="fa-brands cursor-pointer fa-facebook-f"></i>
              </li>

              <li>
                <i className="fa-brands cursor-pointer fa-twitter"></i>
              </li>

              <li>
                <i className="fa-brands cursor-pointer fa-youtube"></i>
              </li>

              <li>
                <i className="fa-brands cursor-pointer fa-linkedin"></i>
              </li>
            </ul>

            <ul className="flex items-center gap-2">
              {token ? (
                <li>
                  <span className="cursor-pointer" onClick={toggle}>
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/Register">Register</NavLink>
                  </li>

                  <li>
                    <NavLink to="/Login">Login</NavLink>
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
    </>
  );
}
