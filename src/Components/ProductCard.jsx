import React from "react";
import {
  FiHeart,
  FiShoppingBag,
  FiStar,
  FiZap,
} from "react-icons/fi";
import "./ProductCard.css";

function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
  onBuyNow,
}) {
  if (!product) return null;

  const {
    name,
    brand,
    price,
    image,
    category,
    rating,
    reviews,
    originalPrice,
    discount,
    isNew,
  } = product;

  const formatPrice = (value) =>
    Number(value || 0).toLocaleString("en-IN");

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onBuyNow) {
      onBuyNow(product);
    }
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  return (
    <article className="product-card">

      {/* IMAGE */}

      <div className="product-image-container">

        {isNew && (
          <span className="product-new">
            NEW
          </span>
        )}

        {discount > 0 && (
          <span className="product-discount">
            {discount}% OFF
          </span>
        )}

        <button
          type="button"
          className="wishlist-button"
          aria-label={`Add ${name} to wishlist`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <FiHeart />
        </button>

        <button
          type="button"
          className="product-image-button"
          onClick={handleViewDetails}
          aria-label={`View ${name}`}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              className="product-image"
            />
          ) : (
            <div className="product-image-placeholder">
              <FiShoppingBag />
            </div>
          )}
        </button>
      </div>

      {/* DETAILS */}

      <div className="product-info">

        <p className="product-brand">
          {brand}
        </p>

        <button
          type="button"
          className="product-name"
          onClick={handleViewDetails}
        >
          {name}
        </button>

        <p className="product-category">
          {category}
        </p>

        {/* RATING */}

        <div className="product-rating">
          <FiStar className="rating-icon" />

          <span>
            {Number(rating || 0).toFixed(1)}
          </span>

          <span className="review-count">
            ({reviews || 0})
          </span>
        </div>

        {/* PRICE */}

        <div className="product-price-row">
          <span className="product-price">
            ₹{formatPrice(price)}
          </span>

          {originalPrice && (
            <span className="product-original-price">
              ₹{formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* ACTION BUTTONS */}

        <div className="product-actions">

          <button
            type="button"
            className="add-cart-button"
            onClick={handleAddToCart}
          >
            <FiShoppingBag />
            <span>Add to Cart</span>
          </button>

          <button
            type="button"
            className="buy-now-button"
            onClick={handleBuyNow}
          >
            <FiZap />
            <span>Buy Now</span>
          </button>

        </div>

      </div>
    </article>
  );
}

export default ProductCard;