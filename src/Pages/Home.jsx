import React from "react";
import { FiArrowRight, FiShoppingBag, FiStar, FiTag } from "react-icons/fi";
import products from "../Data/Products";
import "./Home.css";

function Home({
  onNavigate,
  onAddToCart,
  onBuyNow,
  onViewDetails,
}) {
  const featuredProducts = products.slice(0, 8);

  const categories = [
    {
      name: "Men",
      description: "Explore men's fashion",
      image: products.find((product) => product.gender === "Men")?.image,
    },
    {
      name: "Women",
      description: "Discover women's collection",
      image: products.find((product) => product.gender === "Women")?.image,
    },
    {
      name: "Shoes",
      description: "Step into new styles",
      image: products.find(
        (product) =>
          String(product.category).toLowerCase().includes("shoe")
      )?.image,
    },
    {
      name: "Watches",
      description: "Classic & modern watches",
      image: products.find(
        (product) =>
          String(product.category).toLowerCase().includes("watch")
      )?.image,
    },
  ];

  return (
    <main className="home-page">

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">WELCOME TO NOVA</p>

          <h1>
            Discover Your
            <br />
            <span>Perfect Style</span>
          </h1>

          <p className="home-hero-description">
            Explore a curated collection of fashion, accessories,
            footwear and more. Find products that match your style.
          </p>

          <div className="home-hero-actions">
            <button
              type="button"
              className="home-primary-button"
              onClick={() => onNavigate("products")}
            >
              <span>Shop Now</span>
              <FiArrowRight />
            </button>

            <button
              type="button"
              className="home-secondary-button"
              onClick={() => onNavigate("premium")}
            >
              <FiStar />
              <span>Explore Premium</span>
            </button>
          </div>

          <div className="home-hero-features">
            <div>
              <FiShoppingBag />
              <span>Wide Collection</span>
            </div>

            <div>
              <FiTag />
              <span>Special Offers</span>
            </div>

            <div>
              <FiStar />
              <span>Premium Benefits</span>
            </div>
          </div>
        </div>

        <div className="home-hero-visual">
          <div className="home-hero-card">
            <img
              src={featuredProducts[5]?.image}
              alt="NOVA Featured Product"
            />

            <div className="home-floating-card">
              <span className="floating-card-icon">
                <FiStar />
              </span>

              <div>
                <strong>Featured Collection</strong>
                <small>Explore NOVA styles</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          SHOP BY CATEGORY
      ========================= */}
      <section className="home-section">
        <div className="home-section-heading">
          <div>
            <p className="home-section-eyebrow">EXPLORE</p>
            <h2>Shop by Category</h2>
            <p>
              Find your favourite products from our collections.
            </p>
          </div>

          <button
            type="button"
            className="home-view-all"
            onClick={() => onNavigate("products")}
          >
            View All
            <FiArrowRight />
          </button>
        </div>

        <div className="home-category-grid">
          {categories.map((category) => (
            <button
              type="button"
              className="home-category-card"
              key={category.name}
              onClick={() => onNavigate("products")}
            >
              <img
                src={category.image}
                alt={category.name}
              />

              <div className="home-category-overlay">
                <span>{category.name}</span>
                <small>{category.description}</small>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* =========================
          SPECIAL OFFERS
      ========================= */}
      <section className="home-offers-section">
        <div className="home-offers-content">
          <p className="home-section-eyebrow">
            NOVA SPECIAL
          </p>

          <h2>Shop More. Save More.</h2>

          <p>
            Discover exclusive festive offers and special
            discounts across our collection.
          </p>

          <div className="home-offer-buttons">
            <button
              type="button"
              onClick={() => onNavigate("festive-offers")}
            >
              Festive Offers
              <FiArrowRight />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("discount-days")}
            >
              Discount Days
              <FiArrowRight />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("mega-sale")}
            >
              Mega Sale
              <FiArrowRight />
            </button>
          </div>
        </div>

        <div className="home-offer-badge">
          <span>UP TO</span>
          <strong>40%</strong>
          <small>OFF</small>
        </div>
      </section>

      {/* =========================
          FEATURED PRODUCTS
      ========================= */}
      <section className="home-section">
        <div className="home-section-heading">
          <div>
            <p className="home-section-eyebrow">
              NOVA COLLECTION
            </p>

            <h2>Featured Products</h2>

            <p>
              Handpicked products worth discovering.
            </p>
          </div>

          <button
            type="button"
            className="home-view-all"
            onClick={() => onNavigate("products")}
          >
            Shop All
            <FiArrowRight />
          </button>
        </div>

        <div className="home-featured-grid">
          {featuredProducts.map((product) => (
            <div
              className="home-featured-card"
              key={product.id}
            >
              <div
                className="home-featured-image"
                onClick={() => onViewDetails(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="home-featured-info">
                <span>{product.category}</span>

                <h3>{product.name}</h3>

                <p>{product.brand}</p>

                <div className="home-featured-bottom">
                  <strong>₹{product.price}</strong>

                  <span>
                    ⭐ {product.rating}
                  </span>
                </div>

                <div className="home-featured-actions">
                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() => onBuyNow(product)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          PREMIUM CTA
      ========================= */}
      <section className="home-premium-section">
        <div>
          <p className="home-section-eyebrow">
            NOVA PREMIUM
          </p>

          <h2>
            Upgrade Your
            <br />
            Shopping Experience
          </h2>

          <p>
            Enjoy exclusive benefits, premium products and
            faster delivery with NOVA Premium.
          </p>

          <button
            type="button"
            onClick={() => onNavigate("premium")}
          >
            Explore Premium
            <FiArrowRight />
          </button>
        </div>

        <div className="home-premium-icon">
          <FiStar />
        </div>
      </section>

    </main>
  );
}

export default Home;