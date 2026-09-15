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

const premiumProductIds = [
  6,
  7,
  9,
  10,
  17,
  19,
  20,
  25,
  27,
  29,
  30,
  36,
  37,
  40,
  43,
  46,
  47,
  49,
  50,
];
function Checkout({
  product,
  cart,
  user,
  isPrimeProp = false,
  onBack,
  onOrderPlaced,
}) {
  const { cartTotal } = useCart();

  /* ================= CHECKOUT ITEMS ================= */

  const checkoutItems = product
    ? [product]
    : cart || [];

    const hasPremiumProduct = checkoutItems.some(
  (item) =>
    premiumProductIds.includes(Number(item.id))
);

  /* ================= PRIME ================= */

  const isPrime =
    isPrimeProp ||
    user?.isPrime ||
    user?.prime ||
    user?.primeUser ||
    false;

  /* ================= PAYMENT STATES ================= */

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

  /* ================= CUSTOMER DETAILS ================= */

  const [customerDetails, setCustomerDetails] =
    useState({
      name: user?.name || "",
      phone: "",
      email: user?.email || "",
      pincode: "",
      address: "",
      city: "",
      state: "",
    });

  const [formError, setFormError] =
    useState("");

  /* ================= ITEM TOTAL ================= */

  const itemTotal = useMemo(() => {
    return checkoutItems.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 1),
      0
    );
  }, [checkoutItems]);

  /* ================= PREMIUM DISCOUNT ================= */

const premiumEligibleItems = checkoutItems.filter(
  (item) =>
    premiumProductIds.includes(Number(item.id))
);

const premiumDiscount = isPrime
  ? Math.round(
      premiumEligibleItems.reduce(
        (total, item) =>
          total +
          Number(item.price || 0) *
            Number(item.quantity || 1),
        0
      ) * 0.10
    )
  : 0;
  /* ================= DELIVERY CHARGE ================= */

  const deliveryCharge = isPrime
    ? 0
    : itemTotal >= 3000
    ? 0
    : 99;

  /* ================= PLATFORM FEE ================= */

  const platformFee = isPrime
    ? 0
    : 29;

  /* ================= NOVA COUPON ================= */

  const couponDiscount =
    itemTotal >= 5000
      ? Math.round(itemTotal * 0.05)
      : 0;

  /* ================= FINAL TOTAL ================= */

const finalTotal =
  itemTotal +
  deliveryCharge +
  platformFee -
  couponDiscount -
  premiumDiscount -
  cardDiscount;
  /* ================= CUSTOMER DETAIL CHANGE ================= */

  const handleCustomerDetailChange = (
    field,
    value
  ) => {
    setCustomerDetails((prev) => ({
      ...prev,
      [field]: value,
    }));

    setFormError("");
  };

  /* ================= CARD DISCOUNT ================= */

  const handleCardChange = (value) => {
    const numbersOnly =
      value.replace(/\D/g, "");

    if (numbersOnly.length >= 16) {
      setCardDiscount(
        Math.round(itemTotal * 0.03)
      );
    } else {
      setCardDiscount(0);
    }
  };

  /* ================= PAYMENT METHOD ================= */

  const handlePaymentMethodChange = (
    method
  ) => {
    setPaymentMethod(method);

    setFormError("");

    if (method !== "card") {
      setCardDiscount(0);
    }
  };

  /* ================= PLACE ORDER ================= */

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const {
      name,
      phone,
      email,
      pincode,
      address,
      city,
      state,
    } = customerDetails;

    /* ================= DELIVERY VALIDATION ================= */

    if (
      !name.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !pincode.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim()
    ) {
      setFormError(
        "Please fill in all mandatory delivery details."
      );
      return;
    }

    /* ================= PHONE VALIDATION ================= */

    if (!/^\d{10}$/.test(phone)) {
      setFormError(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    /* ================= PINCODE VALIDATION ================= */

    if (!/^\d{6}$/.test(pincode)) {
      setFormError(
        "Please enter a valid 6-digit pincode."
      );
      return;
    }

    /* ================= EMAIL VALIDATION ================= */

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      setFormError(
        "Please enter a valid email address."
      );
      return;
    }

    /* ================= UPI VALIDATION ================= */

    if (
      paymentMethod === "upi" &&
      !upiId.trim()
    ) {
      setFormError(
        "Please enter your UPI ID."
      );
      return;
    }

    /* ================= CARD VALIDATION ================= */

    if (paymentMethod === "card") {
      const cardDigits =
        cardNumber.replace(/\D/g, "");

      if (cardDigits.length !== 16) {
        setFormError(
          "Please enter a valid 16-digit card number."
        );
        return;
      }

      if (!expiry.trim()) {
        setFormError(
          "Please enter the card expiry date."
        );
        return;
      }

      if (!/^\d{3}$/.test(cvv)) {
        setFormError(
          "Please enter a valid 3-digit CVV."
        );
        return;
      }
    }

    /* ================= VALIDATION SUCCESS ================= */

    setFormError("");

    setPlacingOrder(true);

    setTimeout(() => {
      setPlacingOrder(false);

      alert(
        "Order placed successfully! Thank you for shopping with NOVA."
      );

      if (onOrderPlaced) {
  onOrderPlaced({
    customerDetails,
    paymentMethod,
    finalTotal: Math.max(
      0,
      finalTotal
    ),
  });
}
    }, 800);
  };

  return (
    <main className="checkout-page">

      <div className="checkout-container">

        {/* ================= TOP ================= */}

        <button
          type="button"
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

          {/* ================= LEFT SIDE ================= */}

          <section className="checkout-main">

            {/* ================= DELIVERY INFORMATION ================= */}

            <div className="checkout-card">

              <h2>
                Delivery Information
              </h2>

              <p
                style={{
                  fontSize: "13px",
                  color: "#777",
                  marginBottom: "15px",
                }}
              >
                Fields marked with * are mandatory.
              </p>

              <div className="checkout-form-grid">

                {/* FULL NAME */}

                <input
                  placeholder="Full Name *"
                  value={customerDetails.name}
                  onChange={(e) =>
                    handleCustomerDetailChange(
                      "name",
                      e.target.value
                    )
                  }
                />

                {/* PHONE */}

                <input
                  placeholder="Phone Number *"
                  value={customerDetails.phone}
                  maxLength={10}
                  inputMode="numeric"
                  onChange={(e) =>
                    handleCustomerDetailChange(
                      "phone",
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />

                {/* EMAIL */}

                <input
                  placeholder="Email Address *"
                  type="email"
                  value={customerDetails.email}
                  onChange={(e) =>
                    handleCustomerDetailChange(
                      "email",
                      e.target.value
                    )
                  }
                />

                {/* PINCODE */}

                <input
                  placeholder="Pincode *"
                  value={customerDetails.pincode}
                  maxLength={6}
                  inputMode="numeric"
                  onChange={(e) =>
                    handleCustomerDetailChange(
                      "pincode",
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />

                {/* ADDRESS */}

                <input
                  className="full-input"
                  placeholder="Full Address *"
                  value={customerDetails.address}
                  onChange={(e) =>
                    handleCustomerDetailChange(
                      "address",
                      e.target.value
                    )
                  }
                />

                {/* CITY */}

                <input
                  placeholder="City *"
                  value={customerDetails.city}
                  onChange={(e) =>
                    handleCustomerDetailChange(
                      "city",
                      e.target.value
                    )
                  }
                />

                {/* STATE */}

                <input
                  placeholder="State *"
                  value={customerDetails.state}
                  onChange={(e) =>
                    handleCustomerDetailChange(
                      "state",
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* ================= ERROR MESSAGE ================= */}

            {formError && (
              <div className="checkout-error">
                ⚠️ {formError}
              </div>
            )}

            {/* ================= PAYMENT ================= */}

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

                {/* COD */}

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

              {/* ================= UPI ================= */}

              {paymentMethod === "upi" && (
                <div className="payment-content">

                  <label>
                    UPI ID *
                  </label>

                  <input
                    value={upiId}
                    onChange={(e) => {
                      setUpiId(
                        e.target.value
                      );
                      setFormError("");
                    }}
                    placeholder="example@upi"
                  />

                  <p className="payment-help">
                    Enter your UPI ID to continue.
                  </p>

                </div>
              )}

              {/* ================= CARD ================= */}

              {paymentMethod === "card" && (
                <div className="payment-content">

                  <label>
                    Card Number *
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

                      setFormError("");
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    inputMode="numeric"
                  />

                  <div className="card-row">

                    <div>
                      <label>
                        Expiry *
                      </label>

                      <input
                        value={expiry}
                        onChange={(e) => {
                          setExpiry(
                            e.target.value
                          );
                          setFormError("");
                        }}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>

                    <div>
                      <label>
                        CVV *
                      </label>

                      <input
                        value={cvv}
                        onChange={(e) => {
                          setCvv(
                            e.target.value.replace(
                              /\D/g,
                              ""
                            )
                          );
                          setFormError("");
                        }}
                        placeholder="123"
                        maxLength={3}
                        inputMode="numeric"
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

              {/* ================= WALLET ================= */}

              {paymentMethod === "wallet" && (
                <div className="payment-content">

                  <label>
                    Select Wallet *
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

              {/* ================= COD ================= */}

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

          {/* ================= RIGHT SUMMARY ================= */}

          <aside className="checkout-summary">

            <h2>
              Order Summary
            </h2>

            {/* ================= PRODUCTS ================= */}

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

            {/* ================= PRIME ================= */}

            {isPrime && hasPremiumProduct && (
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
                <p>
  ✓ 10% discount on Premium products
</p>

              </div>
            )}

            {/* ================= SUBTOTAL ================= */}

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

            {/* ================= DELIVERY ================= */}

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

            {/* ================= PLATFORM FEE ================= */}

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

            {/* ================= NOVA DISCOUNT ================= */}

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
            {premiumDiscount > 0 && (
  <div className="checkout-summary-row discount">
    <span>
      NOVA Premium Discount
    </span>

    <strong>
      -₹
      {premiumDiscount.toLocaleString(
        "en-IN"
      )}
    </strong>
  </div>
)}

            {/* ================= CARD DISCOUNT ================= */}

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

            {/* ================= TOTAL ================= */}

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

            {/* ================= PLACE ORDER ================= */}

            <button
              type="button"
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

            {/* ================= SECURITY ================= */}

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