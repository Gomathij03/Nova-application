import React from "react";
import ProductGrid from "../Components/ProductGrid";
import saleProducts from "../Data/SaleProducts";
import "./SalesPage.css";

function FestiveOffers({
  onNavigate,
  onAddToCart,
  onBuyNow,
  onViewDetails,
  wishlist = [],
  onAddToWishlist,
  onRemoveFromWishlist,
}) {
  const festiveProducts = saleProducts.festive;

  return (
    <main className="sales-page">

      <button
        type="button"
        className="sales-back-button"
        onClick={() => onNavigate("products")}
      >
        ← Back to Products
      </button>

      <section className="sales-hero festive-sale-hero">
        <div className="sales-hero-content">

          <span className="sales-eyebrow">
            VINAYAKAR CHATURTHI
          </span>

          <h1>
            Festive
            <br />
            Offers
          </h1>

          <p>
            Celebrate the festive season with exclusive
            products and special savings.
          </p>

          <div className="sales-offer">
            <span>UP TO</span>
            <strong>50%</strong>
            <span>OFF</span>
          </div>

        </div>
      </section>

      <section className="sale-products-section">

        <div className="sale-products-heading">
          <div>
            <span className="sales-section-eyebrow">
              SPECIAL FESTIVE SALE
            </span>

            <h2>Festive Sale Products</h2>

            <p>
              Explore our exclusive festive collection.
            </p>
          </div>

          <span className="sale-product-count">
            {festiveProducts.length} Products
          </span>
        </div>

       <ProductGrid
  products={festiveProducts}
  onAddToCart={onAddToCart}
  onBuyNow={onBuyNow}
  onViewDetails={onViewDetails}
  wishlist={wishlist}
  onAddToWishlist={onAddToWishlist}
  onRemoveFromWishlist={onRemoveFromWishlist}
/>

      </section>

    </main>
  );
}

export default FestiveOffers;