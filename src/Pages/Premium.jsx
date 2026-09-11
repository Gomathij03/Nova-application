import React from "react";
import {
  FiAward,
  FiTruck,
  FiPercent,
  FiClock,
  FiShield,
  FiCheck,
  FiArrowLeft,
} from "react-icons/fi";
import "./Premium.css";

function Premium({
  isPrime = false,
  onActivate,
  onNavigate,
}) {
  return (
    <main className="premium-page">
      <div className="premium-container">

        {/* BACK */}
        <button
          className="premium-back"
          onClick={() => onNavigate("settings")}
        >
          <FiArrowLeft />
          Back to Settings
        </button>

        {/* HERO */}
        <section className="premium-hero">

          <div className="premium-hero-content">

            <span className="premium-label">
              <FiAward />
              NOVA PREMIUM
            </span>

            <h1>
              Shopping made
              <span> better.</span>
            </h1>

            <p>
              Enjoy faster delivery, exclusive discounts
              and a better NOVA shopping experience.
            </p>

            {!isPrime ? (
              <button
                className="premium-join-btn"
                onClick={onActivate}
              >
                Join NOVA Premium
              </button>
            ) : (
              <div className="premium-active">
                <FiCheck />
                You are a NOVA Premium Member
              </div>
            )}

          </div>

          <div className="premium-price-card">

            <p>Membership</p>

            <div className="premium-price">
              ₹999
              <span>/ year</span>
            </div>

            <span className="premium-save">
              Save more on every order
            </span>

          </div>

        </section>

        {/* BENEFITS */}
        <section className="premium-benefits-section">

          <div className="premium-section-heading">
            <p>MEMBER BENEFITS</p>
            <h2>Everything you need to shop smarter</h2>
          </div>

          <div className="premium-benefits-grid">

            <div className="premium-benefit">
              <div className="premium-benefit-icon">
                <FiTruck />
              </div>

              <h3>Free Delivery</h3>

              <p>
                Get free delivery on eligible NOVA
                orders.
              </p>
            </div>

            <div className="premium-benefit">
              <div className="premium-benefit-icon">
                <FiPercent />
              </div>

              <h3>Exclusive Discounts</h3>

              <p>
                Get special discounts and member-only
                offers.
              </p>
            </div>

            <div className="premium-benefit">
              <div className="premium-benefit-icon">
                <FiClock />
              </div>

              <h3>Priority Delivery</h3>

              <p>
                Get faster delivery on selected
                products.
              </p>
            </div>

            <div className="premium-benefit">
              <div className="premium-benefit-icon">
                <FiShield />
              </div>

              <h3>Premium Support</h3>

              <p>
                Get priority assistance whenever you
                need help.
              </p>
            </div>

          </div>

        </section>

        {/* FEATURES */}
        <section className="premium-plan">

          <div>
            <p className="premium-plan-label">
              NOVA PREMIUM
            </p>

            <h2>
              One membership.
              <br />
              More benefits.
            </h2>

            <p className="premium-plan-description">
              Upgrade your shopping experience with
              NOVA Premium.
            </p>
          </div>

          <div className="premium-check-list">

            <div>
              <FiCheck />
              Free delivery
            </div>

            <div>
              <FiCheck />
              No platform fee
            </div>

            <div>
              <FiCheck />
              Exclusive member offers
            </div>

            <div>
              <FiCheck />
              Priority delivery
            </div>

            <div>
              <FiCheck />
              Premium customer support
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}

export default Premium;