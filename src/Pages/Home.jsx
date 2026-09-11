import React, { useMemo, useState } from "react";
import Header from "../Components/Header";
import SmartSearch from "../Components/SmartSearch";
import TopFilters from "../Components/TopFilters";
import ProductGrid from "../Components/ProductGrid";
import { products } from "../data/products";
import "./Home.css";

function Home({
  onAddToCart,
  onProductClick,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const [selectedBrand, setSelectedBrand] =
    useState("All Brands");

  const [selectedGender, setSelectedGender] =
    useState("All");

  const [selectedPrice, setSelectedPrice] =
    useState("all");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /* SEARCH */
    if (searchTerm.trim()) {
      const search = searchTerm
        .trim()
        .toLowerCase();

      result = result.filter((product) => {
        const name = String(
          product.name || ""
        ).toLowerCase();

        const brand = String(
          product.brand || ""
        ).toLowerCase();

        const category = String(
          product.category || ""
        ).toLowerCase();

        const gender = String(
          product.gender || ""
        ).toLowerCase();

        return (
          name.includes(search) ||
          brand.includes(search) ||
          category.includes(search) ||
          gender.includes(search)
        );
      });
    }

    /* CATEGORY */
    if (
      selectedCategory &&
      selectedCategory !== "All Categories"
    ) {
      result = result.filter(
        (product) =>
          product.category === selectedCategory
      );
    }

    /* BRAND */
    if (
      selectedBrand &&
      selectedBrand !== "All Brands"
    ) {
      result = result.filter(
        (product) =>
          product.brand === selectedBrand
      );
    }

    /* GENDER */
    if (
      selectedGender &&
      selectedGender !== "All"
    ) {
      result = result.filter(
        (product) =>
          product.gender === selectedGender
      );
    }

    /* PRICE */
    if (selectedPrice !== "all") {
      result = result.filter((product) => {
        const price = Number(product.price) || 0;

        switch (selectedPrice) {
          case "under-50":
            return price < 50;

          case "50-100":
            return price >= 50 && price <= 100;

          case "100-200":
            return price > 100 && price <= 200;

          case "above-200":
            return price > 200;

          default:
            return true;
        }
      });
    }

    return result;
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    selectedGender,
    selectedPrice,
  ]);

  const handleClearFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedBrand("All Brands");
    setSelectedGender("All");
    setSelectedPrice("all");
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="home-page">

      {/* NAVBAR */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* HERO */}
      <section className="home-hero">
        <div className="hero-content">

          <span className="hero-label">
            NEW COLLECTION
          </span>

          <h1>
            Find Something
            <br />
            <span>Worth Wearing.</span>
          </h1>

          <p>
            Discover thoughtfully selected products
            designed to fit your style and everyday life.
          </p>

          <button
            type="button"
            className="hero-button"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Explore Collection
          </button>

        </div>

        <div className="hero-decoration">
          <div className="hero-circle">
            <span>N</span>
          </div>
        </div>
      </section>

      {/* SMART SEARCH */}
      <section className="search-section-wrapper">
        <SmartSearch
          products={products}
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
          onProductClick={onProductClick}
        />
      </section>

      {/* PRODUCTS */}
      <main
        id="products"
        className="products-area"
      >

        <TopFilters
          products={products}
          selectedCategory={selectedCategory}
          setSelectedCategory={
            setSelectedCategory
          }
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedGender={selectedGender}
          setSelectedGender={
            setSelectedGender
          }
          selectedPrice={selectedPrice}
          setSelectedPrice={
            setSelectedPrice
          }
          onClearFilters={
            handleClearFilters
          }
        />

        <ProductGrid
          products={filteredProducts}
          onAddToCart={onAddToCart}
          onProductClick={onProductClick}
        />

      </main>

    </div>
  );
}

export default Home;