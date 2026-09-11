import React, { useState } from "react";
import {
  FiShoppingBag,
  FiSearch,
  FiUser,
  FiLogOut,
  FiStar,
  FiSettings,
  FiMenu,
  FiX,
  
} from "react-icons/fi";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import "./Header.css";

function Header({
  onSearch,
  onLogin,
  onSignup,
  onLogout,
  onNavigate,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [mobileSearch, setMobileSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const { user, isLoggedIn } = useAuth();
  const { cartCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();

    const value = searchValue.trim();

    if (value) {
      onSearch(value);
      setMobileSearch(false);
      setMobileMenu(false);
    }
  };

  const handleLogoClick = () => {
    setSearchValue("");
    onSearch("");
    onNavigate("products");
  };

  const handleProductsClick = () => {
    setSearchValue("");
    onSearch("");
    onNavigate("products");
  };

  return (
    <header className="main-header">
      <div className="navbar">

        {/* LOGO */}
        <button
          type="button"
          className="brand-logo"
          onClick={handleLogoClick}
        >
          NOVA
        </button>

        {/* DESKTOP NAVIGATION */}
        <nav className="desktop-navigation">
        
          <button onClick={handleLogoClick}>
            Home
          </button>

          <button onClick={handleProductsClick}>
            Products
          </button>

          <button
  className="premium-link"
  onClick={() => onNavigate("premium")}
>
  <FiStar size={15} />
  Premium
</button>


        </nav>

        {/* SEARCH */}
        <form
          className={`navbar-search ${
            mobileSearch ? "active" : ""
          }`}
          onSubmit={handleSearch}
        >
          <FiSearch
            className="search-icon"
            size={18}
          />

          <input
            type="text"
            placeholder="Search products, brand, category..."
            value={searchValue}
            onChange={(e) =>
              setSearchValue(e.target.value)
            }
          />

          <button
            type="submit"
            className="search-submit"
            aria-label="Search"
          >
            <FiSearch size={18} />
          </button>

          {mobileSearch && (
            <button
              type="button"
              className="close-search"
              onClick={() => {
                setMobileSearch(false);
                setSearchValue("");
              }}
            >
              <FiX />
            </button>
          )}
        </form>

        {/* RIGHT ACTIONS */}
        <div className="navbar-actions">

          {/* MOBILE SEARCH */}
          <button
            className="mobile-search-button"
            onClick={() =>
              setMobileSearch((prev) => !prev)
            }
          >
            <FiSearch />
          </button>

          {/* CART */}
          <button
            type="button"
            className="nav-icon-button"
            onClick={() => onNavigate("cart")}
            aria-label="Cart"
          >
            <FiShoppingBag />

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </button>
{/* SETTINGS */}
  {isLoggedIn && (
    <button
  type="button"
  className="settings-button"
  onClick={() => onNavigate("settings")}
  aria-label="Settings"
  title="Settings"
>
  <FiSettings />
</button>
  )}
        
          {/* USER */}
          {isLoggedIn && user ? (
            <>
              <div className="logged-user">
                <div className="user-avatar">
                  <FiUser />
                </div>

                <span className="user-name">
                  Hi, {user.name || "User"}
                </span>
              </div>

              
            </>
          ) : (
            <div className="auth-actions">
              <button
                className="login-button"
                onClick={onLogin}
              >
                Login
              </button>

              <button
                className="signup-button"
                onClick={onSignup}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* MOBILE MENU */}
          <button
            className="mobile-menu-button"
            onClick={() =>
              setMobileMenu((prev) => !prev)
            }
          >
            {mobileMenu ? <FiX /> : <FiMenu />}
          </button>

        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobileMenu && (
        <div className="mobile-navigation">

          <button
            onClick={() => {
              handleLogoClick();
              setMobileMenu(false);
            }}
          >
            Home
          </button>

          <button
            onClick={() => {
              handleProductsClick();
              setMobileMenu(false);
            }}
          >
            Products
          </button>

          <button
  onClick={() => {
    onNavigate("premium");
    setMobileMenu(false);
  }}
>
  <FiStar />
  Premium
</button>
<button
  onClick={() => {
    onNavigate("settings");
    setMobileMenu(false);
  }}
>
  <FiSettings />
  Settings
</button>

          {!isLoggedIn && (
            <div className="mobile-auth-actions">
              <button onClick={onLogin}>
                Login
              </button>

              <button onClick={onSignup}>
                Sign Up
              </button>
            </div>
          )}

          {isLoggedIn && (
            <button
              className="mobile-logout"
              onClick={onLogout}
            >
              <FiLogOut />
              Logout
            </button>
          )}

        </div>
      )}
    </header>
  );
}

export default Header;