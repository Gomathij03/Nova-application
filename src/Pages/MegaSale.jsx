import React from "react";
import ProductGrid from "../Components/ProductGrid";
import saleProducts from "../Data/SaleProducts";
import "./SalesPage.css";

function MegaSale({
  onAddToCart,
  onBuyNow,
  onViewDetails,
  onNavigate,
}) {
  const megaProducts = saleProducts.mega;

  return (
    <main className="sales-page">

      <button
        type="button"
        className="sales-back-button"
        onClick={() => onNavigate("products")}
      >
        ← Back to Products
      </button>

      <section className="sales-hero mega-sale-hero">
        <div className="sales-hero-content">

          <span className="sales-eyebrow">
            SPECIAL FESTIVE OFFER
          </span>

          <h1>
            Mega
            <br />
            Sale
          </h1>

          <p>
            Enjoy amazing deals across fashion, accessories,
            footwear and home decor.
          </p>

          <div className="sales-offer">
            <span>UP TO</span>
            <strong>30%</strong>
            <span>OFF</span>
          </div>

        </div>
      </section>

      <section className="sale-products-section">

        <div className="sale-products-heading">
          <div>
            <span className="sales-section-eyebrow">
              NOVA MEGA SALE
            </span>

            <h2>Mega Sale Products</h2>

            <p>
              Shop exclusive deals across multiple categories.
            </p>
          </div>

          <span className="sale-product-count">
            {megaProducts.length} Products
          </span>
        </div>

        <ProductGrid
          products={megaProducts}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          onViewDetails={onViewDetails}
        />

      </section>

    </main>
  );
}

export default MegaSale;