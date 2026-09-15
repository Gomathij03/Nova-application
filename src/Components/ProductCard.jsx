import React from "react";
import { FiShoppingBag, FiZap } from "react-icons/fi";

function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
  onBuyNow,
  wishlist = [],
  onAddToWishlist,
  onRemoveFromWishlist,
  isWishlistPage = false,
}) {
  const premiumProductIds = [
    6, 7, 9, 10, 17, 19, 20,
    25, 27, 29, 30, 36, 37,
    40, 43, 46, 47, 49, 50,
  ];

  const isPremiumProduct = premiumProductIds.includes(product.id);

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const handleWishlistClick = (e) => {
    e.stopPropagation();

    if (isWishlisted) {
      if (onRemoveFromWishlist) {
        onRemoveFromWishlist(product.id);
      }
    } else {
      if (onAddToWishlist) {
        onAddToWishlist(product);
      }
    }
  };
{isWishlistPage && (
  <button
    type="button"
    className="wishlist-remove-button"
    onClick={() => onRemoveFromWishlist(product.id)}
  >
    Remove from Wishlist
  </button>
)}
  return (
    <div className="product-card">
      <div
        className="product-image-container"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <button
          type="button"
          className={`wishlist-button ${
            isWishlisted ? "wishlisted" : ""
          }`}
          onClick={handleWishlistClick}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          {isWishlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        {isPremiumProduct && (
          <div className="product-premium-row">
            <span className="premium-product-badge">
              👑 Premium
            </span>

            <span className="tomorrow-delivery-badge">
              🚚 Get it by <strong>Tomorrow</strong>
            </span>
          </div>
        )}

        <p className="product-category">
          {product.category}
        </p>

        <h2>{product.name}</h2>

        <p className="product-brand">
          {product.brand}
        </p>

        <p className="product-color">
          {product.color}
        </p>

        <div className="product-rating">
          ⭐ {product.rating}
        </div>

        <div className="product-price-row">
          <h3>₹{product.price}</h3>

          {product.originalPrice && (
            <span className="original-price">
              ₹{product.originalPrice}
            </span>
          )}

          {product.discount && (
            <span className="discount-price">
              {product.discount}% OFF
            </span>
          )}
        </div>

        <div className="product-actions">
          <button
            type="button"
            className="add-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            <FiShoppingBag />
            <span>Add to Cart</span>
          </button>

          <button
            type="button"
            className="details-btn"
            onClick={() => onBuyNow(product)}
          >
            <FiZap />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;