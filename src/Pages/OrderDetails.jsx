import React, { useState } from "react";
import {
  FiArrowLeft,
  FiPackage,
  FiMapPin,
  FiCreditCard,
  FiXCircle,
  FiRefreshCw,
  FiCheckCircle,
  FiUser,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import "./OrderDetails.css";

function OrderDetails({
  order,
  onBack,
  onNavigate,
  onOrderCancelled,
  onOrderReturned,
}) {
  const [showCancel, setShowCancel] = useState(false);
  const [showReturn, setShowReturn] = useState(false);

  const [cancelReason, setCancelReason] = useState("");
  const [returnReason, setReturnReason] = useState("");

  if (!order) {
    return (
      <main className="order-details-page">
        <div className="order-details-empty">
          <FiPackage size={50} />

          <h1>Order Not Found</h1>

          <button onClick={onBack}>
            Back to Orders
          </button>
        </div>
      </main>
    );
  }

  const products = order.items || order.products || [];

  const orderStatus =
    order.status || "Confirmed";

  const orderTotal =
    Number(order.total || order.amount || 0);

  /* ================= CANCEL ORDER ================= */

  const handleCancel = () => {
    if (!cancelReason) {
      alert(
        "Please select a cancellation reason."
      );
      return;
    }

    alert(
      `Order cancelled successfully.\nReason: ${cancelReason}`
    );

    setShowCancel(false);

    if (onOrderCancelled) {
      onOrderCancelled(order.id);
    }
  };

  /* ================= RETURN ORDER ================= */

  const handleReturn = () => {
    if (!returnReason) {
      alert(
        "Please select a return reason."
      );
      return;
    }

    if (onOrderReturned) {
      onOrderReturned(
        order.id,
        returnReason
      );
    }

    setShowReturn(false);
  };

  return (
    <main className="order-details-page">

      <div className="order-details-container">

        {/* ================= BACK ================= */}

        <button
          className="order-details-back"
          onClick={onBack}
        >
          <FiArrowLeft />
          Back to Orders
        </button>

        {/* ================= HEADER ================= */}

        <div className="order-details-header">

          <div>
            <p className="order-details-eyebrow">
              NOVA ORDER
            </p>

            <h1>
              Order Details
            </h1>

            <p>
              Order ID: #{order.id}
            </p>
          </div>

          <div className="order-status-wrapper">

            <span
              className={`order-status ${orderStatus
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              <FiCheckCircle />
              {orderStatus}
            </span>

            {order.returnStatus && (
              <span className="refund-status">
                <FiRefreshCw />
                {order.returnStatus}
              </span>
            )}

            {order.refundStatus && (
              <span className="refund-status">
                <FiRefreshCw />
                {order.refundStatus}
              </span>
            )}

          </div>

        </div>

        <div className="order-details-layout">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <section className="order-details-main">

            {/* ================= ORDERED PRODUCTS ================= */}

            <div className="order-details-card">

              <div className="order-card-heading">

                <div>
                  <h2>
                    Ordered Products
                  </h2>

                  <p>
                    {products.length}{" "}
                    {products.length === 1
                      ? "product"
                      : "products"}
                  </p>
                </div>

                <FiPackage />

              </div>

              <div className="ordered-products">

                {products.map(
                  (item, index) => {

                    const quantity =
                      Number(
                        item.quantity || 1
                      );

                    const price =
                      Number(
                        item.price || 0
                      );

                    return (
                      <div
                        className="ordered-product"
                        key={
                          item.id || index
                        }
                      >

                        {/* PRODUCT IMAGE */}

                        <div className="ordered-product-image">

                          {item.image ? (
                            <img
                              src={item.image}
                              alt={
                                item.name
                              }
                            />
                          ) : (
                            <FiPackage />
                          )}

                        </div>

                        {/* PRODUCT DETAILS */}

                        <div className="ordered-product-info">

                          <span>
                            {
                              item.brand ||
                              "NOVA"
                            }
                          </span>

                          <h3>
                            {item.name}
                          </h3>

                          {item.category && (
                            <p>
                              {
                                item.category
                              }
                            </p>
                          )}

                          <div className="ordered-product-meta">

                            {item.color && (
                              <small>
                                Color:{" "}
                                {
                                  item.color
                                }
                              </small>
                            )}

                            {item.size && (
                              <small>
                                Size:{" "}
                                {
                                  item.size
                                }
                              </small>
                            )}

                            <small>
                              Qty:{" "}
                              {quantity}
                            </small>

                          </div>

                        </div>

                        {/* PRODUCT TOTAL */}

                        <strong>
                          ₹
                          {(
                            price *
                            quantity
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

            {/* =====================================================
                DELIVERY INFORMATION
            ===================================================== */}

            <div className="order-details-card">

              <div className="order-card-heading">

                <div>
                  <h2>
                    Delivery Information
                  </h2>

                  <p>
                    Customer and delivery details
                  </p>
                </div>

                <FiMapPin />

              </div>

              <div className="delivery-details">

                {/* CUSTOMER NAME */}

                <div className="delivery-detail-row">

                  <FiUser />

                  <div>
                    <span>
                      Full Name
                    </span>

                    <strong>
                      {order.address?.name ||
                        order.user?.name ||
                        "Not provided"}
                    </strong>
                  </div>

                </div>

                {/* PHONE */}

                <div className="delivery-detail-row">

                  <FiPhone />

                  <div>
                    <span>
                      Phone Number
                    </span>

                    <strong>
                      {order.address?.phone ||
                        "Not provided"}
                    </strong>
                  </div>

                </div>

                {/* EMAIL */}

                <div className="delivery-detail-row">

                  <FiMail />

                  <div>
                    <span>
                      Email Address
                    </span>

                    <strong>
                      {order.address?.email ||
                        "Not provided"}
                    </strong>
                  </div>

                </div>

                {/* ADDRESS */}

                <div className="delivery-detail-row">

                  <FiMapPin />

                  <div>
                    <span>
                      Address
                    </span>

                    <strong>
                      {order.address?.address ||
                        "Not provided"}
                    </strong>
                  </div>

                </div>

                {/* CITY */}

                <div className="delivery-detail-row">

                  <div className="delivery-detail-placeholder">
                    City
                  </div>

                  <div>
                    <span>
                      City
                    </span>

                    <strong>
                      {order.address?.city ||
                        "Not provided"}
                    </strong>
                  </div>

                </div>

                {/* STATE */}

                <div className="delivery-detail-row">

                  <div className="delivery-detail-placeholder">
                    State
                  </div>

                  <div>
                    <span>
                      State
                    </span>

                    <strong>
                      {order.address?.state ||
                        "Not provided"}
                    </strong>
                  </div>

                </div>

                {/* PINCODE */}

                <div className="delivery-detail-row">

                  <div className="delivery-detail-placeholder">
                    PIN
                  </div>

                  <div>
                    <span>
                      Pincode
                    </span>

                    <strong>
                      {order.address?.pincode ||
                        "Not provided"}
                    </strong>
                  </div>

                </div>

              </div>

            </div>

            {/* =====================================================
                PAYMENT INFORMATION
            ===================================================== */}

            <div className="order-details-card">

              <div className="order-card-heading">

                <div>

                  <h2>
                    Payment Information
                  </h2>

                  <p>
                    Payment details for this order
                  </p>

                </div>

                <FiCreditCard />

              </div>

              <div className="payment-info">

                <div>
                  <span>
                    Payment Method
                  </span>

                  <strong>
                    {order.paymentMethod ||
                      "Cash on Delivery"}
                  </strong>
                </div>

                <div>
                  <span>
                    Payment Status
                  </span>

                  <strong>
                    {order.paymentStatus ||
                      "Pending"}
                  </strong>
                </div>

                {order.refundStatus && (
                  <div>
                    <span>
                      Refund Status
                    </span>

                    <strong className="refund-initiated">
                      {
                        order.refundStatus
                      }
                    </strong>
                  </div>
                )}

              </div>

            </div>

          </section>

          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}

          <aside className="order-details-summary">

            {/* ================= SUMMARY ================= */}

            <div className="order-summary-card">

              <h2>
                Order Summary
              </h2>

              <div className="summary-line">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹
                  {Number(
                    order.subtotal ||
                      orderTotal
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div className="summary-line">

                <span>
                  Delivery
                </span>

                <strong>
                  {Number(
                    order.delivery ||
                      order.deliveryCharge ||
                      0
                  ) === 0
                    ? "FREE"
                    : `₹${
                        order.delivery ||
                        order.deliveryCharge
                      }`}
                </strong>

              </div>

              <div className="summary-line">

                <span>
                  Platform Fee
                </span>

                <strong>
                  {Number(
                    order.platformFee || 0
                  ) === 0
                    ? "FREE"
                    : `₹${Number(
                        order.platformFee
                      ).toLocaleString(
                        "en-IN"
                      )}`}
                </strong>

              </div>

              {(order.discount || 0) >
                0 && (
                <div className="summary-line discount">

                  <span>
                    Discount
                  </span>

                  <strong>
                    -₹
                    {Number(
                      order.discount
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>
              )}

              <div className="summary-divider" />

              <div className="order-total">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹
                  {orderTotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

            </div>

            {/* ================= ACTIONS ================= */}

            <div className="order-actions-card">

              <h2>
                Order Actions
              </h2>

              {orderStatus !==
                "Cancelled" && (
                <>

                  <button
                    className="cancel-order-btn"
                    onClick={() =>
                      setShowCancel(true)
                    }
                  >
                    <FiXCircle />
                    Cancel Order
                  </button>

                  <button
                    className="return-order-btn"
                    onClick={() =>
                      setShowReturn(true)
                    }
                  >
                    <FiRefreshCw />
                    Return Product
                  </button>

                </>
              )}

              {orderStatus ===
                "Cancelled" && (
                <div className="cancelled-message">

                  <FiXCircle />

                  This order has been cancelled.

                </div>
              )}

            </div>

          </aside>

        </div>

        {/* =====================================================
            CANCEL MODAL
        ===================================================== */}

        {showCancel && (

          <div className="order-modal-overlay">

            <div className="order-modal">

              <button
                className="modal-close"
                onClick={() =>
                  setShowCancel(false)
                }
              >
                ×
              </button>

              <FiXCircle className="modal-icon" />

              <h2>
                Cancel Order
              </h2>

              <p>
                Please select a reason for
                cancelling this order.
              </p>

              <select
                value={cancelReason}
                onChange={(e) =>
                  setCancelReason(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select cancellation reason
                </option>

                <option>
                  Changed my mind
                </option>

                <option>
                  Ordered by mistake
                </option>

                <option>
                  Found a better price
                </option>

                <option>
                  Delivery is taking too long
                </option>

                <option>
                  Product no longer required
                </option>

                <option>
                  Other reason
                </option>

              </select>

              <div className="modal-actions">

                <button
                  className="modal-secondary"
                  onClick={() =>
                    setShowCancel(false)
                  }
                >
                  Keep Order
                </button>

                <button
                  className="modal-danger"
                  onClick={handleCancel}
                >
                  Cancel Order
                </button>

              </div>

            </div>

          </div>

        )}

        {/* =====================================================
            RETURN MODAL
        ===================================================== */}

        {showReturn && (

          <div className="order-modal-overlay">

            <div className="order-modal">

              <button
                className="modal-close"
                onClick={() =>
                  setShowReturn(false)
                }
              >
                ×
              </button>

              <FiRefreshCw className="modal-icon" />

              <h2>
                Return Product
              </h2>

              <p>
                Please select a reason for
                returning this product.
              </p>

              <select
                value={returnReason}
                onChange={(e) =>
                  setReturnReason(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select return reason
                </option>

                <option>
                  Product is damaged
                </option>

                <option>
                  Wrong product received
                </option>

                <option>
                  Product does not match description
                </option>

                <option>
                  Size or fit issue
                </option>

                <option>
                  Product quality issue
                </option>

                <option>
                  Changed my mind
                </option>

                <option>
                  Other reason
                </option>

              </select>

              <div className="modal-actions">

                <button
                  className="modal-secondary"
                  onClick={() =>
                    setShowReturn(false)
                  }
                >
                  Go Back
                </button>

                <button
                  className="modal-return"
                  onClick={handleReturn}
                >
                  Submit Return
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}

export default OrderDetails;