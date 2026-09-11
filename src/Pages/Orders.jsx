import React from "react";
import {
  FiPackage,
  FiArrowLeft,
  FiChevronRight,
} from "react-icons/fi";
import "./Orders.css";

function Orders({
  orders = [],
  onNavigate,
  onViewOrder,
}) {
  return (
    <main className="orders-page">
      <div className="orders-container">

        <button
          className="orders-back"
          onClick={() => onNavigate("settings")}
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="orders-header">
          <p>NOVA ACCOUNT</p>
          <h1>Orders & Returns</h1>
          <span>
            Track your orders and manage returns
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="orders-empty">
            <FiPackage size={50} />

            <h2>No Orders Yet</h2>

            <p>
              Your placed orders will appear here.
            </p>

            <button
              onClick={() => onNavigate("products")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">

            {orders.map((order) => (
              <div
                className="order-card"
                key={order.id}
              >
                <div className="order-card-left">

                  <div className="order-icon">
                    <FiPackage />
                  </div>

                  <div>
                    <h3>
                      Order #{order.id}
                    </h3>

                    <p>
                      {order.items?.length || 0} product(s)
                    </p>

                    <span className="order-status">
                      {order.status || "Confirmed"}
                    </span>
                  </div>

                </div>

                <div className="order-card-right">

                  <strong>
                    ₹
                    {Number(
                      order.total || 0
                    ).toLocaleString("en-IN")}
                  </strong>

                  <button
                    onClick={() =>
                      onViewOrder(order)
                    }
                  >
                    View Details
                    <FiChevronRight />
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}

export default Orders;