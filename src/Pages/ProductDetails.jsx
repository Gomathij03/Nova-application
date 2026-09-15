import React, { useState } from "react";
import {
  FiArrowLeft,
  FiShoppingBag,
  FiZap,
  FiHeart,
} from "react-icons/fi";
import "./ProductDetails.css";

function ProductDetails({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  wishlist = [],
  onAddToWishlist,
  onRemoveFromWishlist,
}) {
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="product-details-page">
        <div className="product-details-empty">
          <h2>Product not found</h2>

          <button type="button" onClick={onBack}>
            <FiArrowLeft />
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const handleWishlist = () => {
    if (isWishlisted) {
      onRemoveFromWishlist(product.id);
    } else {
      onAddToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  return (
    <main className="product-details-page">
      <div className="product-details-container">

        {/* BACK BUTTON */}
        <button
          type="button"
          className="product-details-back"
          onClick={onBack}
        >
          <FiArrowLeft />
          Back to Products
        </button>

        {/* PRODUCT DETAILS */}
        <section className="product-details-card">

          {/* IMAGE */}
          <div className="product-details-image-section">
            <div className="product-details-image">
              <img
                src={product.image}
                alt={product.name}
              />

              <button
                type="button"
                className={`product-details-wishlist ${
                  isWishlisted ? "active" : ""
                }`}
                onClick={handleWishlist}
                aria-label="Wishlist"
              >
                <FiHeart
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>

          {/* INFORMATION */}
          <div className="product-details-info">

            <span className="product-details-category">
              {product.category}
            </span>

            <h1>{product.name}</h1>

            <p className="product-details-brand">
              {product.brand}
            </p>

            <div className="product-details-rating">
              <span>⭐ {product.rating}</span>
              <span>Customer Rating</span>
            </div>

            <div className="product-details-price">
              ₹{product.price}

              {product.originalPrice && (
                <span className="details-original-price">
                  ₹{product.originalPrice}
                </span>
              )}

              {product.discount && (
                <span className="details-discount">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <div className="product-details-divider"></div>

            {/* PRODUCT INFORMATION */}
            <div className="product-details-specs">

              <div>
                <span>Brand</span>
                <strong>{product.brand}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{product.category}</strong>
              </div>

              <div>
                <span>Color</span>
                <strong>{product.color}</strong>
              </div>

              <div>
                <span>Size</span>
                <strong>{product.size}</strong>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="product-details-description">
              <h3>Product Description</h3>

              <p>
                {product.description ||
                  `Explore the ${product.name} from ${product.brand}.
                  Designed for comfort, style and everyday use,
                  this product is a great addition to your collection.`}
              </p>
            </div>

            {/* QUANTITY */}
            <div className="product-details-quantity">
              <span>Quantity</span>

              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) => Math.max(1, prev - 1))
                  }
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) => prev + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="product-details-actions">

              <button
                type="button"
                className="details-add-cart"
                onClick={handleAddToCart}
              >
                <FiShoppingBag />
                Add to Cart
              </button>

             <button
  type="button"
  className="details-buy-now"
  onClick={() =>
    onBuyNow({
      ...product,
      quantity: quantity,
    })
  }
>
  <FiZap />
  Buy Now
</button>

            </div>

            {/* DELIVERY */}
            <div className="product-details-delivery">
              <strong>🚚 Delivery Information</strong>

              <p>
                Free delivery available on eligible orders.
              </p>

              <p>
                Easy returns and secure checkout.
              </p>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;