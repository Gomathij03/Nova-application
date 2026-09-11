import React, { useEffect, useRef, useState } from "react";
import {
  FiSearch,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import "./SmartSearch.css";

function SmartSearch({
  products = [],
  value = "",
  onChange,
  onProductClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  const searchResults = products
    .filter((product) => {
      if (!value.trim()) return false;

      const search = value.toLowerCase().trim();

      const name = String(product.name || "").toLowerCase();
      const brand = String(product.brand || "").toLowerCase();
      const category = String(
        product.category || ""
      ).toLowerCase();
      const description = String(
        product.description || ""
      ).toLowerCase();

      return (
        name.includes(search) ||
        brand.includes(search) ||
        category.includes(search) ||
        description.includes(search)
      );
    })
    .slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleChange = (event) => {
    const newValue = event.target.value;

    if (onChange) {
      onChange(newValue);
    }

    setIsOpen(Boolean(newValue.trim()));
  };

  const handleClear = () => {
    if (onChange) {
      onChange("");
    }

    setIsOpen(false);
  };

  const handleProductClick = (product) => {
    setIsOpen(false);

    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <div
      className="smart-search"
      ref={searchRef}
    >
      <div className="smart-search-input">
        <FiSearch className="smart-search-icon" />

        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => {
            if (value.trim()) {
              setIsOpen(true);
            }
          }}
          placeholder="Search products, brands or categories..."
          aria-label="Search products"
        />

        {value && (
          <button
            type="button"
            className="smart-search-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
      </div>

      {isOpen && value.trim() && (
        <div className="smart-search-results">

          {searchResults.length > 0 ? (
            <>
              <div className="smart-search-title">
                <span>SMART RESULTS</span>

                <small>
                  {searchResults.length} found
                </small>
              </div>

              <div className="search-result-list">
                {searchResults.map((product) => (
                  <button
                    type="button"
                    className="search-result-item"
                    key={product.id}
                    onClick={() =>
                      handleProductClick(product)
                    }
                  >
                    <div className="search-result-image">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                        />
                      ) : (
                        <span>🛍️</span>
                      )}
                    </div>

                    <div className="search-result-info">
                      <strong>
                        {product.name}
                      </strong>

                      {product.brand && (
                        <span>
                          {product.brand}
                        </span>
                      )}

                      <small>
                        {product.category || "Product"}
                      </small>
                    </div>

                    <FiArrowRight className="search-result-arrow" />
                  </button>
                ))}
              </div>

              <div className="smart-search-footer">
                Press Enter to view all results
              </div>
            </>
          ) : (
            <div className="no-search-results">
              <div className="no-results-icon">
                <FiSearch />
              </div>

              <strong>No products found</strong>

              <p>
                Try searching for another product,
                brand or category.
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default SmartSearch;