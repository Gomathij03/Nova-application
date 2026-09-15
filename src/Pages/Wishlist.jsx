import React from "react";
import ProductGrid from "../Components/ProductGrid";
import "./Wishlist.css";

function Wishlist({
  wishlist = [],
  onRemoveFromWishlist,
  onAddToCart,
  onBuyNow,
  onViewDetails,
  onNavigate,
}) {
  return (
    <main className="wishlist-page">
      <div className="wishlist-header">
        <div>
          <p className="wishlist-eyebrow">NOVA COLLECTION</p>

          <h1>My Wishlist</h1>

          <p className="wishlist-description">
            Save your favourite products and shop them anytime.
          </p>
        </div>

        <span className="wishlist-count">
          {wishlist.length} Items
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">♡</div>

          <h2>Your Wishlist is Empty</h2>

          <p>
            Save products you love and find them here later.
          </p>

          <button
            type="button"
            onClick={() => onNavigate("products")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <section className="wishlist-products">
          <ProductGrid
            products={wishlist}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
            onViewDetails={onViewDetails}
            wishlist={wishlist}
            onAddToWishlist={() => {}}
            onRemoveFromWishlist={onRemoveFromWishlist}
            isWishlistPage={true}
          />
        </section>
      )}
    </main>
  );
}

export default Wishlist;