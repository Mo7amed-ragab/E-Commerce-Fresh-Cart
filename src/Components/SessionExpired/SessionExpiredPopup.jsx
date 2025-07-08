import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";

export default function SessionExpiredPopup({ children }) {
  const navigate = useNavigate();
  const isSessionExpired = localStorage.getItem("token") == null;

  useEffect(() => {
    if (isSessionExpired) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSessionExpired, navigate]);

  if (!isSessionExpired) {
    return <>{children}</>;
  }

  return (
    <>
      <Modal isOpen={true} centered backdrop="static" keyboard={false}>
        <ModalBody>
          <div className="d-flex align-items-center justify-content-center p-3">
            <h4 className="mb-0">Session Expired</h4>

            <div className="spinner-border text-primary mx-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
