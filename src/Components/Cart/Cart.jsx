import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function Cart() {
  const {
    allCart,
    totalCart,
    numOfCart,
    fetchUpdateCount,
    deleteProduct,
    clearUserCart,
  } = useContext(cartContext);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // --- Modal Toggle Functions ---
  const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);
  const toggleClearModal = () => setIsClearModalOpen(!isClearModalOpen);

  // --- Selection Logic ---
  const toggleSelectItem = (productId) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === allCart?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(allCart?.map((item) => item.product._id) || []);
    }
  };

  // --- Delete Logic ---
  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    toggleDeleteModal();
  };

  async function handleConfirmDelete() {
    if (!productToDelete) return;
    setIsDeleting(true);
    const success = await deleteProduct(productToDelete);
    setIsDeleting(false);
    toast[success ? "success" : "error"](
      success ? "Item removed successfully." : "Failed to remove item."
    );
    setSelectedItems((prev) => prev.filter((id) => id !== productToDelete));
    toggleDeleteModal();
  }

  // --- Clear Logic ---
  async function handleConfirmClear() {
    setIsClearing(true);
    try {
      if (selectedItems.length > 0) {
        // Delete selected items only
        for (const productId of selectedItems) {
          await deleteProduct(productId);
        }
        toast.success(`${selectedItems.length} item(s) removed successfully.`);
        setSelectedItems([]);
      } else {
        // Clear entire cart
        const success = await clearUserCart();
        toast[success ? "success" : "error"](
          success ? "Cart cleared successfully." : "Failed to clear cart."
        );
      }
    } catch (error) {
      toast.error("An error occurred during removal.");
    } finally {
      setIsClearing(false);
      toggleClearModal();
    }
  }

  // --- Update Count Logic ---
  function handleFetchUpdateCount(id, newCount) {
    if (newCount > 0) {
      fetchUpdateCount(id, newCount);
    }
  }

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
        <div className="container mx-auto px-4">
          {numOfCart > 0 ? (
            <>
              <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
                Your Shopping Cart
              </h1>
              <p className="text-center text-lg mb-2 text-teal-600 dark:text-teal-400 font-semibold">
                Total Price: {totalCart} LE
              </p>
              <p className="text-center pb-6 text-gray-600 dark:text-gray-300">
                Your cart includes {numOfCart} different item(s).
              </p>

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  {selectedItems.length > 0 && (
                    <Button
                      color="danger"
                      outline
                      onClick={toggleClearModal}
                      disabled={!selectedItems.length && !allCart?.length}
                    >
                      <i className="fa-solid fa-trash-can me-2"></i>
                      {selectedItems.length > 0
                        ? `Clear Selected (${selectedItems.length})`
                        : "Clear Cart"}
                    </Button>
                  )}
                </div>
              </div>

              <div className="relative overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center w-12">
                        <input
                          type="checkbox"
                          checked={
                            selectedItems.length === allCart?.length &&
                            allCart.length > 0
                          }
                          onChange={toggleSelectAll}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCart?.map((product) => (
                      <tr
                        key={product.product._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 align-middle"
                      >
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(
                              product.product._id
                            )}
                            onChange={() =>
                              toggleSelectItem(product.product._id)
                            }
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </td>
                        <td className="p-4 flex justify-center">
                          <img
                            src={product.product.imageCover}
                            className="w-20 h-20 object-cover rounded-md"
                            alt={product.product.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <button
                              disabled={product.count === 1}
                              onClick={() =>
                                handleFetchUpdateCount(
                                  product.product._id,
                                  product.count - 1
                                )
                              }
                              className="inline-flex items-center justify-center p-1 text-sm font-medium h-8 w-8 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Minus button</span>
                              <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <span className="mx-3 font-semibold text-gray-900 dark:text-white">
                              {product.count}
                            </span>
                            <button
                              onClick={() =>
                                handleFetchUpdateCount(
                                  product.product._id,
                                  product.count + 1
                                )
                              }
                              className="inline-flex items-center justify-center h-8 w-8 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Plus button</span>
                              <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-center text-gray-900 dark:text-white">
                          {product.price} LE
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() =>
                              handleDeleteClick(product.product._id)
                            }
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Your cart is empty.
              </h2>
              <p className="text-gray-500 mt-2">
                Looks like you haven't added anything to your cart yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Single Item Modal */}
      <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal} centered>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Removal</ModalHeader>
        <ModalBody>
          Are you sure you want to remove this item from your cart?
        </ModalBody>
        <ModalFooter>
          <Button outline onClick={toggleDeleteModal}>
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Removing..." : "Remove"}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Smart Clear Modal */}
      <Modal isOpen={isClearModalOpen} toggle={toggleClearModal} centered>
        <ModalHeader toggle={toggleClearModal}>
          {selectedItems.length > 0
            ? `Confirm Removal of ${selectedItems.length} Item(s)`
            : "Confirm Clear Cart"}
        </ModalHeader>
        <ModalBody>
          {selectedItems.length > 0
            ? `Are you sure you want to remove ${selectedItems.length} selected item(s) from your cart?`
            : "Are you sure you want to remove all items from your cart? This action cannot be undone."}
        </ModalBody>
        <ModalFooter>
          <Button outline onClick={toggleClearModal}>
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={handleConfirmClear}
            disabled={isClearing}
          >
            {isClearing
              ? "Processing..."
              : selectedItems.length > 0
              ? `Remove (${selectedItems.length})`
              : "Clear All"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
