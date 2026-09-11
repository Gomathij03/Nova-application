import React from "react";
import ProductGrid from "../Components/ProductGrid";
import saleProducts from "../Data/SaleProducts";
import "./SalesPage.css";

function DiscountDays({
  onAddToCart,
  onBuyNow,
  onViewDetails,
  onNavigate,
}) {
  const discountProducts = saleProducts.discount;

  return (
    <main className="sales-page">

      <button
        type="button"
        className="sales-back-button"
        onClick={() => onNavigate("products")}
      >
        ← Back to Products
      </button>

      <section className="sales-hero discount-sale-hero">
        <div className="sales-hero-content">

          <span className="sales-eyebrow">
            FESTIVE SHOPPING DAYS
          </span>

          <h1>
            Big
            <br />
            Discount Days
          </h1>

          <p>
            Shop more and save more with our exclusive
            discount day collection.
          </p>

          <div className="sales-offer">
            <span>FLAT</span>
            <strong>40%</strong>
            <span>OFF</span>
          </div>

        </div>
      </section>

      <section className="sale-products-section">

        <div className="sale-products-heading">
          <div>
            <span className="sales-section-eyebrow">
              BIG DISCOUNT SALE
            </span>

            <h2>Discount Day Products</h2>

            <p>
              Discover fashion and accessories at special prices.
            </p>
          </div>

          <span className="sale-product-count">
            {discountProducts.length} Products
          </span>
        </div>

        <ProductGrid
          products={discountProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          onViewDetails={onViewDetails}
        />

      </section>

    </main>
  );
}

export default DiscountDays;