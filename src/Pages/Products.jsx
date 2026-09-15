import React, { useState } from "react";
import ProductGrid from "../Components/ProductGrid";
import TopFilters from "../Components/TopFilters";
import products from "../Data/Products";
import OfferBanner from "../Components/OfferBanner";
import "./Products.css";

function Products({
  searchTerm = "",
  onAddToCart,
  onViewDetails,
  onBuyNow,
  onOfferClick,
  wishlist = [],
  onAddToWishlist,
  onRemoveFromWishlist,
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortOption, setSortOption] = useState("default");
  const [selectedGender, setSelectedGender] = useState("All");

  const search = String(searchTerm).toLowerCase().trim();
  const hasSearched = search.length > 0;

  /* ================= FILTER PRODUCTS ================= */

  const filteredProducts = products.filter((product) => {
    const productName =
      String(product.name || "").toLowerCase();

    const brand =
      String(product.brand || "").toLowerCase();

    const category =
      String(product.category || "").toLowerCase();

    const color =
      String(product.color || "").toLowerCase();

    const gender =
      String(product.gender || "").toLowerCase();

    const size =
      String(product.size || "").toLowerCase();

    const matchesSearch =
      !search ||
      productName.includes(search) ||
      brand.includes(search) ||
      category.includes(search) ||
      color.includes(search) ||
      gender.includes(search) ||
      size.includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      category === selectedCategory.toLowerCase();

    const matchesColor =
      selectedColor === "All" ||
      color === selectedColor.toLowerCase();

    const matchesSize =
      selectedSize === "All" ||
      size === selectedSize.toLowerCase();

    const matchesPrice =
      Number(product.price || 0) <= Number(maxPrice);

    const matchesGender =
      selectedGender === "All" ||
      gender === selectedGender.toLowerCase();

    return (
      matchesSearch &&
      matchesCategory &&
      matchesColor &&
      matchesSize &&
      matchesPrice &&
      matchesGender
    );
  });

  /* ================= SORT ================= */

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low") {
      return (
        Number(a.price || 0) -
        Number(b.price || 0)
      );
    }

    if (sortOption === "price-high") {
      return (
        Number(b.price || 0) -
        Number(a.price || 0)
      );
    }

    if (sortOption === "rating") {
      return (
        Number(b.rating || 0) -
        Number(a.rating || 0)
      );
    }

    return 0;
  });

  /* ================= OFFER CLICK ================= */

  const handleOfferClick = (offer) => {
    console.log("Selected offer:", offer);

    // Send banner information to App.jsx
    if (onOfferClick) {
      onOfferClick(offer);
    }
  };

  return (
    <main className="products-page">

      <div className="products-container">

        {/* ================= PRODUCT HEADING ================= */}

        <div className="products-heading">

          <div>

            <p className="products-eyebrow">
              NOVA COLLECTION
            </p>

            <h1>
              {hasSearched
                ? `Search Results for "${searchTerm}"`
                : "Discover Products"}
            </h1>

            <p className="products-description">
              {hasSearched
                ? `Showing products matching "${searchTerm}".`
                : "Search for a product to explore our collection."}
            </p>

          </div>

          <span className="products-count">
            {sortedProducts.length} Products
          </span>

        </div>

        {/* ================= OFFER BANNER ================= */}

        {!hasSearched && (
          <OfferBanner
            onOfferClick={handleOfferClick}
          />
        )}

        {/* ================= FILTERS ================= */}

        {hasSearched && (
          <TopFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}

            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}

            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}

            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}

            sortOption={sortOption}
            setSortOption={setSortOption}

            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
          />
        )}

        {/* ================= PRODUCTS ================= */}

        <ProductGrid
  products={sortedProducts}
  onAddToCart={onAddToCart}
  onViewDetails={onViewDetails}
  onBuyNow={onBuyNow}
  wishlist={wishlist}
  onAddToWishlist={onAddToWishlist}
  onRemoveFromWishlist={onRemoveFromWishlist}
/>
      </div>

    </main>
  );
}

export default Products;