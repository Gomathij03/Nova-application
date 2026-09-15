import React from "react";
import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiArrowRight,
} from "react-icons/fi";
import "./Footer.css";

function Footer({ onNavigate }) {
  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="nova-footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <h2>NOVA</h2>

          <p>
            Discover fashion, accessories, footwear and more.
            Shop your favourite products with a smooth and
            convenient shopping experience.
          </p>

          <div className="footer-social">
            <button type="button" aria-label="Instagram">
              <FiInstagram />
            </button>

            <button type="button" aria-label="Facebook">
              <FiFacebook />
            </button>

            <button type="button" aria-label="Twitter">
              <FiTwitter />
            </button>
          </div>
        </div>

        {/* SHOP */}
        <div className="footer-column">
          <h3>Shop</h3>

          <button onClick={() => handleNavigation("home")}>
            Home
          </button>

          <button onClick={() => handleNavigation("products")}>
            Products
          </button>

          <button onClick={() => handleNavigation("wishlist")}>
            Wishlist
          </button>

          <button onClick={() => handleNavigation("premium")}>
            Premium
          </button>
        </div>

        {/* OFFERS */}
        <div className="footer-column">
          <h3>Offers</h3>

          <button onClick={() => handleNavigation("festive-offers")}>
            Festive Offers
          </button>

          <button onClick={() => handleNavigation("discount-days")}>
            Discount Days
          </button>

          <button onClick={() => handleNavigation("mega-sale")}>
            Mega Sale
          </button>

          <button onClick={() => handleNavigation("premium")}>
            Premium Deals
          </button>
        </div>

        {/* ACCOUNT */}
        <div className="footer-column">
          <h3>Account</h3>

          <button onClick={() => handleNavigation("orders")}>
            My Orders
          </button>

          <button onClick={() => handleNavigation("settings")}>
            Settings
          </button>

          <button onClick={() => handleNavigation("cart")}>
            Shopping Cart
          </button>

          <button onClick={() => handleNavigation("wishlist")}>
            My Wishlist
          </button>
        </div>

        {/* SUPPORT */}
        <div className="footer-column footer-support">
          <h3>Need Help?</h3>

          <p>
            Have questions about your order or shopping
            experience?
          </p>

          <button
            type="button"
            onClick={() => handleNavigation("settings")}
            className="footer-support-button"
          >
            Help & Support
            <FiArrowRight />
          </button>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>
            © 2026 NOVA. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <button type="button">Privacy Policy</button>
            <button type="button">Terms & Conditions</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;