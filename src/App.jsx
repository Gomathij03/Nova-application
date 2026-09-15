import React, { useEffect, useState } from "react";

import Header from "./Components/Header";
import Products from "./Pages/Products";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import ProductDetails from "./Pages/ProductDetails";

import { AuthProvider, useAuth } from "./Context/AuthContext";
import { CartProvider, useCart } from "./Context/CartContext";

import Settings from "./Pages/Settings";
import Premium from "./Pages/Premium";
import OrderDetails from "./Pages/OrderDetails";
import Orders from "./Pages/Orders";

import FestiveOffers from "./Pages/FestiveOffers";
import DiscountDays from "./Pages/DiscountDays";
import MegaSale from "./Pages/MegaSale";

import ForgotPassword from "./Pages/ForgotPassword";
import Wishlist from "./Pages/Wishlist";
import "./App.css";


function AppContent() {

 const {
  user,
  isLoggedIn,
  isLoading,
  login,
  signup,
  logout,
} = useAuth();

  const {
    cart,
    cartCount,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  /* ================= STATES ================= */

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState("login");
  useEffect(() => {
  if (!isLoading) {
    setCurrentPage(isLoggedIn ? "products" : "login");
  }
}, [isLoading, isLoggedIn]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [checkoutProduct, setCheckoutProduct] = useState(null);

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("novaOrders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];
  });

  const [isPrime, setIsPrime] = useState(() => {
    return localStorage.getItem("novaPrime") === "true";
  });
const [selectedProduct, setSelectedProduct] = useState(null);

  /* ================= LOGIN ================= */

  const handleLogin = (loggedInUser) => {
    login(loggedInUser);
    setCurrentPage("products");
  };

  
  /* ================= SIGNUP ================= */

  const handleSignup = (newUser) => {
    signup(newUser);
    setCurrentPage("products");
  };

  const handleForgotPassword = () => {
  setCurrentPage("forgot-password");
};


  /* ================= LOGOUT ================= */

  const handleLogout = () => {

    logout();

    clearCart();

    setCheckoutProduct(null);

    setCurrentPage("login");
  };



  /* ================= NAVIGATION ================= */

  const handleNavigation = (page) => {

    if (page === "login" || page === "signup") {
      setCurrentPage(page);
      return;
    }

    if (!isLoggedIn) {
      setCurrentPage("login");
      return;
    }

    setCurrentPage(page);
  };


  /* ================= SEARCH ================= */

  const handleSearch = (value) => {

    setSearchTerm(value);

    setCurrentPage("products");
  };


  /* ================= PREMIUM ================= */

  const handleActivatePremium = () => {

    localStorage.setItem("novaPrime", "true");

    setIsPrime(true);

    alert("Welcome to NOVA Premium!");
  };


  /* ================= ADD TO CART ================= */

  const handleAddToCart = (product) => {

    if (!isLoggedIn) {
      setCurrentPage("login");
      return;
    }

    addToCart(product);

    setCurrentPage("cart");
  };


  /* ================= BUY NOW ================= */

  const handleBuyNow = (product) => {

    if (!isLoggedIn) {
      setCurrentPage("login");
      return;
    }

 setCheckoutProduct({
  ...product,
  quantity: product.quantity || 1,
});

    setCurrentPage("checkout");
  };
  
 const handleAddToWishlist = (product) => {
  if (!isLoggedIn) {
    setCurrentPage("login");
    return;
  }

  const alreadyExists = wishlist.some(
    (item) => item.id === product.id
  );

  if (alreadyExists) return;

  const updatedWishlist = [...wishlist, product];

  setWishlist(updatedWishlist);
  localStorage.setItem(
    "novaWishlist",
    JSON.stringify(updatedWishlist)
  );
};

const handleRemoveFromWishlist = (productId) => {
  const updatedWishlist = wishlist.filter(
    (item) => item.id !== productId
  );

  setWishlist(updatedWishlist);
  localStorage.setItem(
    "novaWishlist",
    JSON.stringify(updatedWishlist)
  );
};


  /* ================= CART CHECKOUT ================= */

  const handleCartCheckout = () => {

    if (!cart || cart.length === 0) {
      return;
    }

    setCheckoutProduct(null);

    setCurrentPage("checkout");
  };


  /* ================= CHECKOUT BACK ================= */

  const handleCheckoutBack = () => {
    setCurrentPage("cart");
  };
 const [wishlist, setWishlist] = useState(() => {
  const savedWishlist = localStorage.getItem("novaWishlist");
  return savedWishlist ? JSON.parse(savedWishlist) : [];
});

  /* ================= ORDER PLACED ================= */
const handleOrderPlaced = (orderData) => {

  const items = checkoutProduct
    ? [checkoutProduct]
    : cart;

  const subtotal = items.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const newOrder = {

    id: Date.now(),

    items,

    subtotal,

    total:
      orderData?.finalTotal ||
      subtotal,

    status: "Confirmed",

    paymentMethod:
      orderData?.paymentMethod === "cod"
        ? "Cash on Delivery"
        : orderData?.paymentMethod === "upi"
        ? "UPI"
        : orderData?.paymentMethod === "card"
        ? "Card"
        : orderData?.paymentMethod === "wallet"
        ? "Wallet"
        : "Cash on Delivery",

    paymentStatus:
      orderData?.paymentMethod === "cod"
        ? "Pending"
        : "Paid",

    /* ================= CUSTOMER DETAILS ================= */

    address: {

      name:
        orderData?.customerDetails?.name ||
        user?.name ||
        "Customer",

      phone:
        orderData?.customerDetails?.phone ||
        "",

      email:
        orderData?.customerDetails?.email ||
        user?.email ||
        "",

      address:
        orderData?.customerDetails?.address ||
        "",

      city:
        orderData?.customerDetails?.city ||
        "",

      state:
        orderData?.customerDetails?.state ||
        "",

      pincode:
        orderData?.customerDetails?.pincode ||
        "",

    },

  };

  const updatedOrders = [
    newOrder,
    ...orders,
  ];

  setOrders(updatedOrders);

  localStorage.setItem(
    "novaOrders",
    JSON.stringify(updatedOrders)
  );

  clearCart();

  setCheckoutProduct(null);

  setCurrentPage("orders");
};
  
  /* ================= RETURN ORDER ================= */

  const handleOrderReturned = (
    orderId,
    returnReason
  ) => {

    const updatedOrders = orders.map((order) =>

      order.id === orderId
        ? {
            ...order,

            status: "Return Initiated",

            returnStatus: "Return Requested",

            returnReason,

            refundStatus: "Refund Initiated",
          }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "novaOrders",
      JSON.stringify(updatedOrders)
    );

    const returnedOrder =
      updatedOrders.find(
        (order) => order.id === orderId
      );

    setSelectedOrder(returnedOrder);

    alert(
      "Return request submitted successfully.\nRefund has been initiated."
    );
  };


  /* ================= CANCEL ORDER ================= */

  const handleOrderCancelled = (orderId) => {

    const updatedOrders =
      orders.filter(
        (order) => order.id !== orderId
      );

    setOrders(updatedOrders);

    localStorage.setItem(
      "novaOrders",
      JSON.stringify(updatedOrders)
    );

    setSelectedOrder(null);

    setCurrentPage("orders");
  };


  /* ================= BANNER NAVIGATION ================= */

  const handleOfferClick = (offer) => {

    const offerId =
      typeof offer === "string"
        ? offer
        : offer?.id;

    console.log("Selected offer ID:", offerId);

    if (offerId === "festive-offer") {

      setCurrentPage("festive-offers");

    } else if (offerId === "big-discount") {

      setCurrentPage("discount-days");

    } else if (offerId === "mega-sale") {

      setCurrentPage("mega-sale");

    }
  };
if (isLoading) {
  return null;
}

  return (

    
    <div className="app">

      {/* ================= HEADER ================= */}

      <Header
        user={user}
        isLoggedIn={isLoggedIn}
        cartCount={cartCount}
        onSearch={handleSearch}
        onLogin={() =>
          handleNavigation("login")
        }
        onSignup={() =>
          handleNavigation("signup")
        }
        onLogout={handleLogout}
        onNavigate={handleNavigation}
      />


      {/* ================= LOGIN ================= */}

      {currentPage === "login" && (

        <Login
  onLogin={handleLogin}
  onSwitchToSignup={() =>
    handleNavigation("signup")
  }
  onForgotPassword={handleForgotPassword}
/>

      )}
      {/* ================= FORGOT PASSWORD ================= */}

{currentPage === "forgot-password" && (
  <ForgotPassword
    onBackToLogin={() =>
      setCurrentPage("login")
    }
  />
)}



      {/* ================= SIGNUP ================= */}

      {currentPage === "signup" && (

        <Signup
          onSignup={handleSignup}
          onSwitchToLogin={() =>
            handleNavigation("login")
          }
        />

      )}

      {currentPage === "home" && isLoggedIn && (
  <Home
    onNavigate={handleNavigation}
    onAddToCart={handleAddToCart}
    onBuyNow={handleBuyNow}

    onViewDetails={(product) => {
  setSelectedProduct(product);
  setCurrentPage("product-details");
}}
  />
)}


      {/* ================= PRODUCTS ================= */}

      {currentPage === "products" &&
        isLoggedIn && (

         <Products
  searchTerm={searchTerm}
  onAddToCart={handleAddToCart}
  onBuyNow={handleBuyNow}
  onViewDetails={(product) => {
  setSelectedProduct(product);
  setCurrentPage("product-details");
}}
  onOfferClick={handleOfferClick}
  wishlist={wishlist}
  onAddToWishlist={handleAddToWishlist}
  onRemoveFromWishlist={handleRemoveFromWishlist}
/>

        )}


      {/* ================= CART ================= */}

      {currentPage === "cart" &&
        isLoggedIn && (

          <Cart
            cart={cart}

            onNavigate={handleNavigation}

            onCheckout={handleCartCheckout}

            onIncrease={increaseQuantity}

            onDecrease={decreaseQuantity}

            onRemove={removeFromCart}
          />

        )}
        {currentPage === "wishlist" && isLoggedIn && (
  <Wishlist
    wishlist={wishlist}
    onRemoveFromWishlist={handleRemoveFromWishlist}
    onAddToCart={handleAddToCart}
    onBuyNow={handleBuyNow}
    onViewDetails={(product) =>
      console.log("Wishlist product details:", product)
    }
    onNavigate={handleNavigation}
  />
)}
{currentPage === "product-details" && isLoggedIn && (
  <ProductDetails
    product={selectedProduct}
    onBack={() => setCurrentPage("products")}
    onAddToCart={handleAddToCart}
    onBuyNow={handleBuyNow}
    wishlist={wishlist}
    onAddToWishlist={handleAddToWishlist}
    onRemoveFromWishlist={handleRemoveFromWishlist}
  />
)}

      {/* ================= CHECKOUT ================= */}

      {currentPage === "checkout" &&
        isLoggedIn && (

          <Checkout
            product={checkoutProduct}

            cart={cart}

            user={user}

            isPrimeProp={isPrime}

            onBack={handleCheckoutBack}

            onOrderPlaced={handleOrderPlaced}
          />

        )}


      {/* ================= ORDERS ================= */}

      {currentPage === "orders" &&
        isLoggedIn && (

          <Orders
            orders={orders}

            onNavigate={handleNavigation}

            onViewOrder={(order) => {

              setSelectedOrder(order);

              setCurrentPage(
                "order-details"
              );

            }}
          />

        )}


      {/* ================= ORDER DETAILS ================= */}

      {currentPage === "order-details" &&
        isLoggedIn && (

          <OrderDetails
            order={selectedOrder}

            onBack={() =>
              setCurrentPage("orders")
            }

            onNavigate={handleNavigation}

            onOrderCancelled={
              handleOrderCancelled
            }

            onOrderReturned={
              handleOrderReturned
            }
          />

        )}


      {/* ================= SETTINGS ================= */}

      {currentPage === "settings" &&
        isLoggedIn && (

          <Settings
            user={user}

            onNavigate={handleNavigation}

            onLogout={handleLogout}

            isPrime={
              user?.isPrime ||
              user?.prime ||
              isPrime
            }
          />

        )}


      {/* ================= PREMIUM ================= */}

      {currentPage === "premium" &&
        isLoggedIn && (

          <Premium
            isPrime={isPrime}

            onActivate={
              handleActivatePremium
            }

            onNavigate={handleNavigation}
          />

        )}


      {/* ================= FESTIVE OFFERS ================= */}

      {currentPage === "festive-offers" &&
        isLoggedIn && (

        <FestiveOffers
  onNavigate={handleNavigation}
  onAddToCart={handleAddToCart}
  onBuyNow={handleBuyNow}
  onViewDetails={(product) =>
    console.log("Festive product:", product)
  }
  wishlist={wishlist}
  onAddToWishlist={handleAddToWishlist}
  onRemoveFromWishlist={handleRemoveFromWishlist}
/>

        )}


      {/* ================= DISCOUNT DAYS ================= */}

      {currentPage === "discount-days" &&
        isLoggedIn && (

          <DiscountDays
  onNavigate={handleNavigation}
  onAddToCart={handleAddToCart}
  onBuyNow={handleBuyNow}
  onViewDetails={(product) =>
    console.log("Discount product:", product)
  }
  wishlist={wishlist}
  onAddToWishlist={handleAddToWishlist}
  onRemoveFromWishlist={handleRemoveFromWishlist}
/>

        )}


      {/* ================= MEGA SALE ================= */}

      {currentPage === "mega-sale" &&
        isLoggedIn && (

          <MegaSale
  onNavigate={handleNavigation}
  onAddToCart={handleAddToCart}
  onBuyNow={handleBuyNow}
  onViewDetails={(product) =>
    console.log("Mega product:", product)
  }
  wishlist={wishlist}
  onAddToWishlist={handleAddToWishlist}
  onRemoveFromWishlist={handleRemoveFromWishlist}
/>

        )}
<Footer onNavigate={handleNavigation} />
    </div>
  );
}


/* ================= APP ================= */

function App() {

  return (

    <AuthProvider>

      <CartProvider>

        <AppContent />

      </CartProvider>

    </AuthProvider>

  );
}

export default App;