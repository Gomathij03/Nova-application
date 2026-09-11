import React from "react";
import { FiSliders } from "react-icons/fi";
import "./TopFilters.css";

function TopFilters({
  selectedCategory,
  setSelectedCategory,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  maxPrice,
  setMaxPrice,
  sortOption,
  setSortOption,
  selectedGender,
  setSelectedGender,
}) {
  return (
    <section className="filters-section">
      <div className="filters-header">
        <div className="filter-title">
          <FiSliders />
          <span>Filter Products</span>
        </div>
      </div>

      <div className="filters-container">

        {/* CATEGORY */}
        <div className="filter-item">
          <label>Category</label>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Shoes">Shoes</option>
            <option value="Bags">Bags</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
         

         {/* Gender */}
        <div className="filter-item">
          <label>Gender</label>
          <select 
          value={selectedGender}
          onChange={(e)=> setSelectedGender(e.target.value)}
          >
          <option value="All">All</option>
           <option value="Men">Men</option>
           <option value="Women">Women</option>
           <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* COLOR */}
        <div className="filter-item">
          <label>Color</label>

          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Pink">Pink</option>
            <option value="Brown">Brown</option>
          </select>
        </div>

        {/* SIZE */}
        <div className="filter-item">
          <label>Size</label>

          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="All">All</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
          </select>
        </div>

        {/* PRICE */}
        <div className="filter-item price-filter">
          <div className="price-label">
            <label>Price Range</label>

            <span>
              ₹0 - ₹{Number(maxPrice).toLocaleString("en-IN")}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />

          <div className="price-values">
            <span>₹0</span>
            <span>₹10,000+</span>
          </div>
        </div>

        {/* SORT */}
        <div className="filter-item sort-filter">
          <label>Sort By</label>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>

      </div>
    </section>
  );
}

export default TopFilters;