import React, { useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiShoppingBag,
  FiStar,
  FiTag,
} from "react-icons/fi";
import "./OfferBanner.css";

import banner1 from "../Assets/vinayakar_sale-3.jpg";
import banner2 from "../Assets/vinayakar_sale-5.jpg";
import banner3 from "../Assets/vinayakar_sale-6.jpg";

function OfferBanner({ onOfferClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: "festive-offer",
      image: banner1,
      eyebrow: "VINAYAKAR CHATURTHI",
      title: "Festive Offers",
      description:
        "Celebrate Vinayakar Chaturthi with exclusive festive collections and special savings.",
      button: "Shop Festive Collection",
      badge: "UP TO 50% OFF",
      icon: <FiStar />,
    },

    {
      id: "big-discount",
      image: banner2,
      eyebrow: "FESTIVE SHOPPING DAYS",
      title: "Big Discount Days",
      description:
        "Shop more and save more with exciting festive offers across our premium collection.",
      button: "Explore Offers",
      badge: "FLAT 40% OFF",
      icon: <FiTag />,
    },

    {
      id: "mega-sale",
      image: banner3,
      eyebrow: "SPECIAL FESTIVE OFFER",
      title: "Mega Sale",
      description:
        "Discover amazing deals on your favourite products and enjoy special festive savings.",
      button: "Shop Now",
      badge: "UP TO 30% OFF",
      icon: <FiShoppingBag />,
    },
  ];

  const currentBanner = banners[currentSlide];

  /* ================= OFFER NAVIGATION ================= */

  const handleBannerClick = () => {
    if (onOfferClick) {
      onOfferClick({
        id: currentBanner.id,
        title: currentBanner.title,
        badge: currentBanner.badge,
      });
    }
  };

  /* ================= PREVIOUS ================= */

  const previousSlide = (e) => {
    e.stopPropagation();

    setCurrentSlide((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  /* ================= NEXT ================= */

  const nextSlide = (e) => {
    e.stopPropagation();

    setCurrentSlide((prev) =>
      prev === banners.length - 1 ? 0 : prev + 1
    );
  };

  /* ================= DOT ================= */

  const handleDotClick = (e, index) => {
    e.stopPropagation();
    setCurrentSlide(index);
  };

  return (
    <section
      className="premium-festive-banner"
      onClick={handleBannerClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleBannerClick();
        }
      }}
    >
      {/* ================= BACKGROUND IMAGE ================= */}

      <img
        src={currentBanner.image}
        alt={currentBanner.title}
        className="festive-banner-image"
      />

      {/* ================= OVERLAY ================= */}

      <div className="festive-banner-overlay"></div>

      {/* ================= DECORATIVE GLOW ================= */}

      <div className="festive-glow festive-glow-one"></div>
      <div className="festive-glow festive-glow-two"></div>

      {/* ================= PREVIOUS ARROW ================= */}

      <button
        type="button"
        className="festive-arrow festive-arrow-left"
        onClick={previousSlide}
        aria-label="Previous banner"
      >
        <FiArrowLeft />
      </button>

      {/* ================= MAIN CONTENT ================= */}

      <div className="festive-left-content">
        <span className="festive-eyebrow">
          {currentBanner.eyebrow}
        </span>

        <div className="festive-line"></div>

        <h2>{currentBanner.title}</h2>

        <h3>{currentBanner.badge}</h3>

        <p>{currentBanner.description}</p>

        {/* ================= FEATURE ROW ================= */}

        <div className="festive-features">
          <div className="festive-feature">
            <span>
              <FiStar />
            </span>

            <small>FESTIVE SPECIAL</small>
          </div>

          <div className="festive-feature">
            <span>
              <FiTag />
            </span>

            <small>EXCLUSIVE DEALS</small>
          </div>

          <div className="festive-feature">
            <span>
              <FiShoppingBag />
            </span>

            <small>SHOP & SAVE</small>
          </div>
        </div>

        {/* ================= SHOP NOW BUTTON ================= */}

        <button
          type="button"
          className="festive-shop-button"
          onClick={(e) => {
            e.stopPropagation();
            handleBannerClick();
          }}
        >
          {currentBanner.icon}

          <span>{currentBanner.button}</span>

          <FiArrowRight />
        </button>
      </div>

      {/* ================= CENTER OFFER BADGE ================= */}

      <div className="festive-center-badge">
        <span className="badge-small">
          NOVA FESTIVE EDIT
        </span>

        <div className="badge-divider"></div>

        <span className="badge-up">
          SPECIAL OFFER
        </span>

        <strong>
          {currentSlide === 0
            ? "50%"
            : currentSlide === 1
            ? "40%"
            : "30%"}
        </strong>

        <span className="badge-off">
          OFF
        </span>

        <div className="badge-star">
          <FiStar />
        </div>
      </div>

      {/* ================= RIGHT PANEL ================= */}

      <div className="festive-right-panel">
        <div className="right-panel-line"></div>

        <span>
          LIMITED FESTIVE EDIT
        </span>

        <strong>
          Celebrate.
          <br />
          Shop.
          <br />
          Save.
        </strong>

        <p>
          Exclusive festive deals
          crafted for your shopping
          experience.
        </p>

        <div className="right-panel-decoration">
          ✦
        </div>
      </div>

      {/* ================= NEXT ARROW ================= */}

      <button
        type="button"
        className="festive-arrow festive-arrow-right"
        onClick={nextSlide}
        aria-label="Next banner"
      >
        <FiArrowRight />
      </button>

      {/* ================= BOTTOM NAVIGATION ================= */}

      <div className="festive-navigation">
        <div className="festive-dots">
          {banners.map((banner, index) => (
            <button
              type="button"
              key={banner.id}
              className={
                index === currentSlide
                  ? "festive-dot active"
                  : "festive-dot"
              }
              onClick={(e) =>
                handleDotClick(e, index)
              }
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>

        <span className="festive-counter">
          {String(currentSlide + 1).padStart(2, "0")}
          {" / "}
          {String(banners.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}

export default OfferBanner;