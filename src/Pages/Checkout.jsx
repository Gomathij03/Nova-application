import React, { useMemo, useState } from "react";
import {
  FiCreditCard,
  FiSmartphone,
  FiCheck,
  FiArrowLeft,
  FiShield,
} from "react-icons/fi";
import { useCart } from "../Context/CartContext";
import "./Checkout.css";
function Checkout({
  product,
  cart,
  user,
  isPrimeProp = false,
  onBack,
  onOrderPlaced,
}) {
  const {
    cartTotal,
  } = useCart();

  const checkoutItems =
    product
      ? [product]
      : cart || [];

 const isPrime =
  isPrimeProp ||
  user?.isPrime ||
  user?.prime ||
  user?.primeUser ||
  false;

  const [paymentMethod, setPaymentMethod] =
    useState("upi");

  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] =
    useState("");

  const [cardDiscount, setCardDiscount] =
    useState(0);

  const [wallet, setWallet] =
    useState("Paytm");

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const itemTotal = useMemo(() => {
    return checkoutItems.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 1),
      0
    );
  }, [checkoutItems]);

  const deliveryCharge = isPrime
    ? 0
    : itemTotal >= 3000
    ? 0
    : 99;

  const platformFee = isPrime
    ? 0
    : 29;

  const couponDiscount =
    itemTotal >= 5000
      ? Math.round(itemTotal * 0.05)
      : 0;

  const finalTotal =
    itemTotal +
    deliveryCharge +
    platformFee -
    couponDiscount -
    cardDiscount;

  /* =========================================
     CARD DISCOUNT
  ========================================= */

  const handleCardChange = (value) => {
    const numbersOnly = value.replace(/\D/g, "");

    if (numbersOnly.length >= 16) {
      setCardDiscount(
        Math.round(itemTotal * 0.03)
      );
    } else {
      setCardDiscount(0);
    }
  };

  /* =========================================
     PAYMENT METHOD CHANGE
  ========================================= */

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);

    // Remove card discount when another
    // payment method is selected
    if (method !== "card") {
      setCardDiscount(0);
    }
  };

  /* =========================================
     PLACE ORDER
  ========================================= */

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    setPlacingOrder(true);

    setTimeout(() => {
      setPlacingOrder(false);

      alert(
        "Order placed successfully! Thank you for shopping with NOVA."
      );

      if (onOrderPlaced) {
        onOrderPlaced();
      }
    }, 800);
  };

  return (
    <main className="checkout-page">

      <div className="checkout-container">

        {/* TOP */}

        <button
          className="checkout-back"
          onClick={onBack}
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="checkout-heading">
          <p>NOVA SECURE CHECKOUT</p>

          <h1>
            Complete Your Order
          </h1>
        </div>

        <div className="checkout-layout">

          {/* LEFT */}

          <section className="checkout-main">

            {/* DELIVERY */}

            <div className="checkout-card">

              <h2>
                Delivery Information
              </h2>

              <div className="checkout-form-grid">

                <input
                  placeholder="Full Name"
                  defaultValue={
                    user?.name || ""
                  }
                  required
                />

                <input
                  placeholder="Phone Number"
                  required
                />

                <input
                  placeholder="Email Address"
                  type="email"
                  defaultValue={
                    user?.email || ""
                  }
                  required
                />

                <input
                  placeholder="Pincode"
                  required
                />

                <input
                  className="full-input"
                  placeholder="Address"
                  required
                />

                <input
                  placeholder="City"
                  required
                />

                <input
                  placeholder="State"
                  required
                />

              </div>

            </div>

            {/* PAYMENT */}

            <div className="checkout-card">

              <h2>
                Payment Method
              </h2>

              <div className="payment-methods">

                {/* UPI */}

                <button
                  type="button"
                  className={
                    paymentMethod === "upi"
                      ? "payment-option active"
                      : "payment-option"
                  }
                  onClick={() =>
                    handlePaymentMethodChange(
                      "upi"
                    )
                  }
                >
                  <FiSmartphone />
                  UPI
                </button>

                {/* CARD */}

                <button
                  type="button"
                  className={
                    paymentMethod === "card"
                      ? "payment-option active"
                      : "payment-option"
                  }
                  onClick={() =>
                    handlePaymentMethodChange(
                      "card"
                    )
                  }
                >
                  <FiCreditCard />
                  Card
                </button>

                {/* WALLET */}

                <button
                  type="button"
                  className={
                    paymentMethod === "wallet"
                      ? "payment-option active"
                      : "payment-option"
                  }
                  onClick={() =>
                    handlePaymentMethodChange(
                      "wallet"
                    )
                  }
                >
                  <span>W</span>
                  Wallet
                </button>

                {/* CASH ON DELIVERY */}

                <button
                  type="button"
                  className={
                    paymentMethod === "cod"
                      ? "payment-option active"
                      : "payment-option"
                  }
                  onClick={() =>
                    handlePaymentMethodChange(
                      "cod"
                    )
                  }
                >
                  <FiCheck />
                  Cash on Delivery
                </button>

              </div>

              {/* UPI */}

              {paymentMethod === "upi" && (
                <div className="payment-content">

                  <label>
                    UPI ID
                  </label>

                  <input
                    value={upiId}
                    onChange={(e) =>
                      setUpiId(
                        e.target.value
                      )
                    }
                    placeholder="example@upi"
                  />

                  <p className="payment-help">
                    Enter your UPI ID to continue.
                  </p>

                </div>
              )}

              {/* CARD */}

              {paymentMethod === "card" && (
                <div className="payment-content">

                  <label>
                    Card Number
                  </label>

                  <input
                    value={cardNumber}
                    onChange={(e) => {
                      const value =
                        e.target.value;

                      setCardNumber(value);

                      handleCardChange(
                        value
                      );
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />

                  <div className="card-row">

                    <div>
                      <label>
                        Expiry
                      </label>

                      <input
                        value={expiry}
                        onChange={(e) =>
                          setExpiry(
                            e.target.value
                          )
                        }
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <label>
                        CVV
                      </label>

                      <input
                        value={cvv}
                        onChange={(e) =>
                          setCvv(
                            e.target.value
                          )
                        }
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>

                  </div>

                  {/* CARD DISCOUNT */}

                  {cardDiscount > 0 && (
                    <div className="card-discount">
                      ✓ 3% card payment discount
                      applied
                    </div>
                  )}

                </div>
              )}

              {/* WALLET */}

              {paymentMethod === "wallet" && (
                <div className="payment-content">

                  <label>
                    Select Wallet
                  </label>

                  <select
                    value={wallet}
                    onChange={(e) =>
                      setWallet(
                        e.target.value
                      )
                    }
                  >
                    <option>
                      Paytm
                    </option>

                    <option>
                      PhonePe
                    </option>

                    <option>
                      Amazon Pay
                    </option>

                    <option>
                      Nova Wallet
                    </option>
                  </select>

                </div>
              )}

              {/* CASH ON DELIVERY */}

              {paymentMethod === "cod" && (
                <div className="payment-content">

                  <label>
                    Cash on Delivery
                  </label>

                  <p className="payment-help">
                    Pay in cash when your order
                    is delivered to your address.
                  </p>

                </div>
              )}

            </div>

          </section>

          {/* RIGHT SUMMARY */}

          <aside className="checkout-summary">

            <h2>
              Order Summary
            </h2>

            {/* ITEMS */}

            <div className="checkout-products">

              {checkoutItems.map((item) => (
                <div
                  className="checkout-product"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>
                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.brand}
                    </p>

                    <span>
                      Qty:{" "}
                      {item.quantity || 1}
                    </span>
                  </div>

                  <strong>
                    ₹
                    {(
                      Number(item.price) *
                      Number(
                        item.quantity || 1
                      )
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>
              ))}

            </div>

            {/* PRIME */}

            {isPrime && (
              <div className="prime-benefits">

                <h3>
                  NOVA PRIME
                </h3>

                <p>
                  ✓ Free delivery
                </p>

                <p>
                  ✓ Tomorrow delivery
                </p>

                <p>
                  ✓ No platform fee
                </p>

              </div>
            )}

            {/* SUMMARY */}

            <div className="checkout-summary-row">
              <span>
                Subtotal
              </span>

              <strong>
                ₹
                {itemTotal.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <div className="checkout-summary-row">
              <span>
                Delivery
              </span>

              <strong>
                {deliveryCharge === 0
                  ? "FREE"
                  : `₹${deliveryCharge}`}
              </strong>
            </div>

            <div className="checkout-summary-row">
              <span>
                Platform Fee
              </span>

              <strong>
                {platformFee === 0
                  ? "FREE"
                  : `₹${platformFee}`}
              </strong>
            </div>

            {couponDiscount > 0 && (
              <div className="checkout-summary-row discount">

                <span>
                  NOVA Discount
                </span>

                <strong>
                  -₹
                  {couponDiscount.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>
            )}

            {/* CARD DISCOUNT */}

            {cardDiscount > 0 && (
              <div className="checkout-summary-row discount">

                <span>
                  Card Discount
                </span>

                <strong>
                  -₹
                  {cardDiscount.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>
            )}

            <div className="checkout-total">

              <span>
                Total Amount
              </span>

              <strong>
                ₹
                {Math.max(
                  0,
                  finalTotal
                ).toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <button
              className="place-order-button"
              onClick={handlePlaceOrder}
              disabled={placingOrder}
            >
              {placingOrder
                ? "Placing Order..."
                : `Place Order • ₹${Math.max(
                    0,
                    finalTotal
                  ).toLocaleString(
                    "en-IN"
                  )}`}
            </button>

            <div className="secure-payment">

              <FiShield />

              Secure & encrypted payment

            </div>

          </aside>

        </div>
      </div>

    </main>
  );
}

export default Checkout;