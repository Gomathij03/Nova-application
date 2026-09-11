import React from "react";
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiShield,
} from "react-icons/fi";
import "./Cart.css";

function Cart({
  cart = [],
  onNavigate,
  onCheckout,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const delivery = subtotal >= 5000 ? 0 : 99;

  const platformFee =
    subtotal > 0 ? 29 : 0;

  const total =
    subtotal + delivery + platformFee;

  const formatPrice = (value) =>
    Number(value || 0).toLocaleString("en-IN");

  if (!cart.length) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <FiShoppingBag />

          <h1>Your Cart is Empty</h1>

          <p>
            Looks like you haven't added anything
            to your cart yet.
          </p>

          <button
            className="continue-shopping-btn"
            onClick={() =>
              onNavigate("products")
            }
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">

      <div className="cart-container">

        {/* HEADER */}

        <div className="cart-header">

          <div>
            <p className="cart-eyebrow">
              NOVA SHOPPING BAG
            </p>

            <h1>Your Cart</h1>

            <p className="cart-item-count">
              {cart.length}{" "}
              {cart.length === 1
                ? "item"
                : "items"}{" "}
              · {cart.reduce(
                (sum, item) =>
                  sum +
                  Number(
                    item.quantity || 1
                  ),
                0
              )}{" "}
              units
            </p>
          </div>

        </div>

        {/* BACK */}

        <button
          className="cart-back-btn"
          onClick={() =>
            onNavigate("products")
          }
        >
          <FiArrowLeft />
          Continue Shopping
        </button>

        <div className="cart-layout">

          {/* CART ITEMS */}

          <section className="cart-items">

            {cart.map((item) => {

              const quantity =
                Number(item.quantity || 1);

              const itemTotal =
                Number(item.price || 0) *
                quantity;

              return (
                <article
                  className="cart-item"
                  key={item.id}
                >

                  {/* IMAGE */}

                  <div className="cart-item-image">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <FiShoppingBag />
                    )}
                  </div>

                  {/* DETAILS */}

                  <div className="cart-item-details">

                    <p className="cart-item-brand">
                      {item.brand}
                    </p>

                    <h2>
                      {item.name}
                    </h2>

                    <p className="cart-item-category">
                      {item.category}
                    </p>

                    <div className="cart-attributes">

                      {item.color && (
                        <span>
                          Color:{" "}
                          <strong>
                            {item.color}
                          </strong>
                        </span>
                      )}

                      {item.size && (
                        <span>
                          Size:{" "}
                          <strong>
                            {item.size}
                          </strong>
                        </span>
                      )}

                    </div>

                    <div className="cart-item-price">
                      ₹{formatPrice(item.price)}
                    </div>

                    {/* QUANTITY */}

                    <div className="cart-item-bottom">

                      <div className="quantity-control">

                        <button
                          onClick={() =>
                            onDecrease(item.id)
                          }
                          disabled={quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <FiMinus />
                        </button>

                        <span>
                          {quantity}
                        </span>

                        <button
                          onClick={() =>
                            onIncrease(item.id)
                          }
                          aria-label="Increase quantity"
                        >
                          <FiPlus />
                        </button>

                      </div>

                      <button
                        className="remove-item-btn"
                        onClick={() =>
                          onRemove(item.id)
                        }
                      >
                        <FiTrash2 />
                        Remove
                      </button>

                    </div>

                  </div>

                  {/* ITEM TOTAL */}

                  <div className="cart-item-total">

                    <span>
                      Item Total
                    </span>

                    <strong>
                      ₹{formatPrice(itemTotal)}
                    </strong>

                  </div>

                </article>
              );
            })}

          </section>

          {/* ORDER SUMMARY */}

          <aside className="cart-summary">

            <div className="summary-card">

              <h2>
                Order Summary
              </h2>

              <div className="summary-row">
                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{formatPrice(subtotal)}
                </strong>
              </div>

              <div className="summary-row">
                <span>
                  Delivery
                </span>

                <strong>
                  {delivery === 0
                    ? "FREE"
                    : `₹${formatPrice(delivery)}`}
                </strong>
              </div>

              <div className="summary-row">
                <span>
                  Platform Fee
                </span>

                <strong>
                  ₹{formatPrice(platformFee)}
                </strong>
              </div>

              <div className="summary-divider" />

              <div className="summary-total">
                <span>
                  Total
                </span>

                <strong>
                  ₹{formatPrice(total)}
                </strong>
              </div>

              <button
                className="checkout-btn"
                onClick={onCheckout}
              >
                Proceed to Checkout
              </button>

              <div className="checkout-benefits">

                <div>
                  <FiShield />
                  Secure checkout
                </div>

                <div>
                  ✓ Easy returns
                </div>

                <div>
                  ✓ Fast delivery
                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>
    </main>
  );
}

export default Cart;