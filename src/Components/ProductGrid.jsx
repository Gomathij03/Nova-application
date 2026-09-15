import React from "react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

function ProductGrid({
  products = [],
  onAddToCart,
  onViewDetails,
  onBuyNow,
  wishlist = [],
  onAddToWishlist,
  onRemoveFromWishlist,
  isWishlistPage = false,
}) {
  if (!products.length) {
    return (
      <section className="product-grid-section">
        <div className="empty-products">
          <h2>No products found</h2>
          <p>Try changing your search or filter options.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="product-grid-section">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
            onBuyNow={onBuyNow}
            wishlist={wishlist}
            onAddToWishlist={onAddToWishlist}
            onRemoveFromWishlist={onRemoveFromWishlist}
            isWishlistPage={isWishlistPage}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;