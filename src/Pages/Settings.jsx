import React, { useState } from "react";
import {
  FiUser,
  FiMapPin,
  FiCreditCard,
  FiBell,
  FiShield,
  FiPackage,
  FiHelpCircle,
  FiChevronRight,
  FiAward,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
  FiCheck,
  FiLogOut,
  FiLock,
  FiMail,
  FiPhone,
  FiSave,
} from "react-icons/fi";
import "./Settings.css";

function Settings({
  user,
  onNavigate,
  onLogout,
  isPrime = false,
}) {
  /* =========================================
     ACTIVE SECTION
  ========================================= */

  const [activeSection, setActiveSection] = useState(null);

  /* =========================================
     PROFILE
  ========================================= */

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [editingProfile, setEditingProfile] =
    useState(false);

  const [savedProfile, setSavedProfile] =
    useState(profile);

  /* =========================================
     ADDRESS
  ========================================= */

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: user?.name || "NOVA User",
      phone: user?.phone || "9876543210",
      address: "Your saved address",
      city: "Erode",
      state: "Tamil Nadu",
      pincode: "638001",
      type: "Home",
    },
  ]);

  const [showAddressForm, setShowAddressForm] =
    useState(false);

  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
  });

  /* =========================================
     PAYMENT
  ========================================= */

  const [paymentMethods, setPaymentMethods] =
    useState([
      {
        id: 1,
        type: "UPI",
        value: "yourupi@upi",
      },
    ]);

  const [showPaymentForm, setShowPaymentForm] =
    useState(false);

  const [paymentForm, setPaymentForm] = useState({
    type: "UPI",
    value: "",
  });

  /* =========================================
     NOTIFICATIONS
  ========================================= */

  const [notifications, setNotifications] =
    useState({
      orderUpdates: true,
      promotions: true,
      offers: false,
      email: true,
      sms: false,
    });

  /* =========================================
     SECURITY
  ========================================= */

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordMessage, setPasswordMessage] =
    useState("");

  /* =========================================
     HELP
  ========================================= */

  const [supportMessage, setSupportMessage] =
    useState("");

  /* =========================================
     PROFILE FUNCTIONS
  ========================================= */

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    setSavedProfile(profile);
    setEditingProfile(false);

    alert("Profile updated successfully.");
  };

  const handleCancelProfile = () => {
    setProfile(savedProfile);
    setEditingProfile(false);
  };

  /* =========================================
     ADDRESS FUNCTIONS
  ========================================= */

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();

    const newAddress = {
      id: Date.now(),
      ...addressForm,
    };

    setAddresses((prev) => [
      ...prev,
      newAddress,
    ]);

    setAddressForm({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      type: "Home",
    });

    setShowAddressForm(false);
  };

  const handleRemoveAddress = (id) => {
    setAddresses((prev) =>
      prev.filter((address) => address.id !== id)
    );
  };

  /* =========================================
     PAYMENT FUNCTIONS
  ========================================= */

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    setPaymentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPayment = (e) => {
    e.preventDefault();

    if (!paymentForm.value.trim()) {
      return;
    }

    const newPayment = {
      id: Date.now(),
      type: paymentForm.type,
      value: paymentForm.value,
    };

    setPaymentMethods((prev) => [
      ...prev,
      newPayment,
    ]);

    setPaymentForm({
      type: "UPI",
      value: "",
    });

    setShowPaymentForm(false);
  };

  const handleRemovePayment = (id) => {
    setPaymentMethods((prev) =>
      prev.filter((payment) => payment.id !== id)
    );
  };

  /* =========================================
     NOTIFICATION FUNCTIONS
  ========================================= */

  const toggleNotification = (name) => {
    setNotifications((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  /* =========================================
     SECURITY FUNCTIONS
  ========================================= */

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;

    setSecurity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (
      !security.currentPassword ||
      !security.newPassword ||
      !security.confirmPassword
    ) {
      setPasswordMessage(
        "Please fill all password fields."
      );
      return;
    }

    if (
      security.newPassword !==
      security.confirmPassword
    ) {
      setPasswordMessage(
        "New passwords do not match."
      );
      return;
    }

    setPasswordMessage(
      "Password updated successfully."
    );

    setSecurity({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  /* =========================================
     SUPPORT
  ========================================= */

  const handleSupportSubmit = (e) => {
    e.preventDefault();

    if (!supportMessage.trim()) {
      return;
    }

    alert(
      "Your support request has been submitted."
    );

    setSupportMessage("");
  };

  /* =========================================
     OPEN SECTION
  ========================================= */

  const openSection = (section) => {
    setActiveSection(section);
  };

  const closeSection = () => {
    setActiveSection(null);
  };

  return (
    <main className="settings-page">
      <div className="settings-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="settings-header">
          <p className="settings-eyebrow">
            NOVA ACCOUNT
          </p>

          <h1>Settings</h1>

          <p>
            Manage your account, orders,
            preferences and membership.
          </p>
        </div>

        {/* =====================================
            PROFILE
        ===================================== */}

        <section className="settings-profile-card">

          <div className="profile-avatar">
            {profile.name
              ? profile.name
                  .charAt(0)
                  .toUpperCase()
              : "U"}
          </div>

          <div className="profile-info">
            <h2>
              {profile.name || "NOVA User"}
            </h2>

            <p>
              {profile.email ||
                "user@example.com"}
            </p>

            {isPrime && (
              <span className="prime-badge">
                <FiAward />
                NOVA PRIME MEMBER
              </span>
            )}
          </div>

          <button
            className="profile-edit-btn"
            onClick={() =>
              openSection("profile")
            }
          >
            <FiEdit2 />
            Edit Profile
          </button>

        </section>

        {/* =====================================
            SETTINGS GRID
        ===================================== */}

        <div className="settings-grid">

          {/* ACCOUNT */}

          <section className="settings-section">

            <div className="settings-section-title">
              <h2>Account</h2>
              <p>
                Manage your personal information
              </p>
            </div>

            <button
              className="settings-item"
              onClick={() =>
                openSection("profile")
              }
            >
              <div className="settings-item-icon">
                <FiUser />
              </div>

              <div className="settings-item-content">
                <h3>
                  Profile Information
                </h3>

                <p>
                  Update your name and
                  account details
                </p>
              </div>

              <FiChevronRight />
            </button>

            <button
              className="settings-item"
              onClick={() =>
                openSection("addresses")
              }
            >
              <div className="settings-item-icon">
                <FiMapPin />
              </div>

              <div className="settings-item-content">
                <h3>Addresses</h3>

                <p>
                  Manage your delivery
                  addresses
                </p>
              </div>

              <FiChevronRight />
            </button>

            <button
              className="settings-item"
              onClick={() =>
                openSection("payments")
              }
            >
              <div className="settings-item-icon">
                <FiCreditCard />
              </div>

              <div className="settings-item-content">
                <h3>
                  Payment Methods
                </h3>

                <p>
                  Manage your saved
                  payment methods
                </p>
              </div>

              <FiChevronRight />
            </button>

          </section>

          {/* SHOPPING */}

          <section className="settings-section">

            <div className="settings-section-title">
              <h2>Shopping</h2>

              <p>
                Manage your shopping
                activity
              </p>
            </div>

            <button
              className="settings-item"
              onClick={() =>
                onNavigate("orders")
              }
            >
              <div className="settings-item-icon">
                <FiPackage />
              </div>

              <div className="settings-item-content">
                <h3>
                  Orders & Returns
                </h3>

                <p>
                  Track orders and manage
                  returns
                </p>
              </div>

              <FiChevronRight />
            </button>

            <button
              className="settings-item"
              onClick={() =>
                onNavigate("premium")
              }
            >
              <div className="settings-item-icon premium-icon">
                <FiAward />
              </div>

              <div className="settings-item-content">
                <h3>NOVA Premium</h3>

                <p>
                  {isPrime
                    ? "You are a Premium member"
                    : "Get free delivery and exclusive benefits"}
                </p>
              </div>

              <FiChevronRight />
            </button>

          </section>

          {/* PREFERENCES */}

          <section className="settings-section">

            <div className="settings-section-title">
              <h2>Preferences</h2>

              <p>
                Customize your shopping
                experience
              </p>
            </div>

            <button
              className="settings-item"
              onClick={() =>
                openSection("notifications")
              }
            >
              <div className="settings-item-icon">
                <FiBell />
              </div>

              <div className="settings-item-content">
                <h3>
                  Notifications
                </h3>

                <p>
                  Manage order and
                  promotional alerts
                </p>
              </div>

              <FiChevronRight />
            </button>

            <button
              className="settings-item"
              onClick={() =>
                openSection("security")
              }
            >
              <div className="settings-item-icon">
                <FiShield />
              </div>

              <div className="settings-item-content">
                <h3>
                  Privacy & Security
                </h3>

                <p>
                  Manage your security
                  and privacy
                </p>
              </div>

              <FiChevronRight />
            </button>

            <button
              className="settings-item"
              onClick={() =>
                openSection("support")
              }
            >
              <div className="settings-item-icon">
                <FiHelpCircle />
              </div>

              <div className="settings-item-content">
                <h3>
                  Help & Support
                </h3>

                <p>
                  Get help with your
                  NOVA account
                </p>
              </div>

              <FiChevronRight />
            </button>

          </section>

          {/* LOGOUT */}

          <section className="settings-section logout-section">

            <div className="settings-section-title">
              <h2>Account Actions</h2>

              <p>
                Manage your NOVA account
              </p>
            </div>

            <button
              className="settings-item logout-item"
              onClick={onLogout}
            >
              <div className="settings-item-icon logout-icon">
                <FiLogOut />
              </div>

              <div className="settings-item-content">
                <h3>Logout</h3>

                <p>
                  Sign out from your NOVA
                  account
                </p>
              </div>

              <FiChevronRight />
            </button>

          </section>

        </div>

        {/* =====================================
            OVERLAY
        ===================================== */}

        {activeSection && (
          <div
            className="settings-overlay"
            onClick={closeSection}
          >
            <div
              className="settings-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="modal-close"
                onClick={closeSection}
              >
                <FiX />
              </button>

              {/* PROFILE */}

              {activeSection ===
                "profile" && (
                <div className="settings-modal-content">

                  <div className="modal-heading">
                    <div className="modal-heading-icon">
                      <FiUser />
                    </div>

                    <div>
                      <h2>
                        Profile Information
                      </h2>

                      <p>
                        Manage your account
                        details
                      </p>
                    </div>
                  </div>

                  {editingProfile ? (
                    <div className="modal-form">

                      <label>
                        Full Name
                      </label>

                      <input
                        name="name"
                        value={
                          profile.name
                        }
                        onChange={
                          handleProfileChange
                        }
                        placeholder="Full Name"
                      />

                      <label>
                        Email Address
                      </label>

                      <input
                        name="email"
                        type="email"
                        value={
                          profile.email
                        }
                        onChange={
                          handleProfileChange
                        }
                        placeholder="Email Address"
                      />

                      <label>
                        Phone Number
                      </label>

                      <input
                        name="phone"
                        value={
                          profile.phone
                        }
                        onChange={
                          handleProfileChange
                        }
                        placeholder="Phone Number"
                      />

                      <div className="modal-actions">

                        <button
                          className="secondary-btn"
                          onClick={
                            handleCancelProfile
                          }
                        >
                          Cancel
                        </button>

                        <button
                          className="primary-btn"
                          onClick={
                            handleSaveProfile
                          }
                        >
                          <FiSave />
                          Save Changes
                        </button>

                      </div>

                    </div>
                  ) : (
                    <div className="profile-details">

                      <div className="detail-row">
                        <FiUser />

                        <div>
                          <span>
                            Full Name
                          </span>

                          <strong>
                            {profile.name ||
                              "NOVA User"}
                          </strong>
                        </div>
                      </div>

                      <div className="detail-row">
                        <FiMail />

                        <div>
                          <span>
                            Email
                          </span>

                          <strong>
                            {profile.email ||
                              "Not available"}
                          </strong>
                        </div>
                      </div>

                      <div className="detail-row">
                        <FiPhone />

                        <div>
                          <span>
                            Phone
                          </span>

                          <strong>
                            {profile.phone ||
                              "Not available"}
                          </strong>
                        </div>
                      </div>

                      <button
                        className="primary-btn full-btn"
                        onClick={() =>
                          setEditingProfile(
                            true
                          )
                        }
                      >
                        <FiEdit2 />
                        Edit Profile
                      </button>

                    </div>
                  )}

                </div>
              )}

              {/* ADDRESSES */}

              {activeSection ===
                "addresses" && (
                <div className="settings-modal-content">

                  <div className="modal-heading">
                    <div className="modal-heading-icon">
                      <FiMapPin />
                    </div>

                    <div>
                      <h2>
                        Delivery Addresses
                      </h2>

                      <p>
                        Manage your saved
                        addresses
                      </p>
                    </div>
                  </div>

                  <div className="address-list">

                    {addresses.map(
                      (address) => (
                        <div
                          className="address-card"
                          key={address.id}
                        >

                          <div className="address-card-top">

                            <div>
                              <span className="address-type">
                                {address.type}
                              </span>

                              <h3>
                                {address.name}
                              </h3>
                            </div>

                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleRemoveAddress(
                                  address.id
                                )
                              }
                            >
                              <FiTrash2 />
                            </button>

                          </div>

                          <p>
                            {address.address}
                            <br />
                            {address.city},{" "}
                            {address.state} -{" "}
                            {address.pincode}
                          </p>

                          <span>
                            Phone:{" "}
                            {address.phone}
                          </span>

                        </div>
                      )
                    )}

                  </div>

                  {!showAddressForm && (
                    <button
                      className="add-new-btn"
                      onClick={() =>
                        setShowAddressForm(
                          true
                        )
                      }
                    >
                      <FiPlus />
                      Add New Address
                    </button>
                  )}

                  {showAddressForm && (
                    <form
                      className="modal-form"
                      onSubmit={
                        handleAddAddress
                      }
                    >

                      <label>
                        Full Name
                      </label>

                      <input
                        name="name"
                        value={
                          addressForm.name
                        }
                        onChange={
                          handleAddressChange
                        }
                        required
                      />

                      <label>
                        Phone Number
                      </label>

                      <input
                        name="phone"
                        value={
                          addressForm.phone
                        }
                        onChange={
                          handleAddressChange
                        }
                        required
                      />

                      <label>
                        Address
                      </label>

                      <textarea
                        name="address"
                        value={
                          addressForm.address
                        }
                        onChange={
                          handleAddressChange
                        }
                        required
                      />

                      <div className="two-column-form">

                        <input
                          name="city"
                          placeholder="City"
                          value={
                            addressForm.city
                          }
                          onChange={
                            handleAddressChange
                          }
                          required
                        />

                        <input
                          name="state"
                          placeholder="State"
                          value={
                            addressForm.state
                          }
                          onChange={
                            handleAddressChange
                          }
                          required
                        />

                      </div>

                      <div className="two-column-form">

                        <input
                          name="pincode"
                          placeholder="Pincode"
                          value={
                            addressForm.pincode
                          }
                          onChange={
                            handleAddressChange
                          }
                          required
                        />

                        <select
                          name="type"
                          value={
                            addressForm.type
                          }
                          onChange={
                            handleAddressChange
                          }
                        >
                          <option>
                            Home
                          </option>

                          <option>
                            Work
                          </option>

                        </select>

                      </div>

                      <div className="modal-actions">

                        <button
                          type="button"
                          className="secondary-btn"
                          onClick={() =>
                            setShowAddressForm(
                              false
                            )
                          }
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="primary-btn"
                        >
                          <FiPlus />
                          Save Address
                        </button>

                      </div>

                    </form>
                  )}

                </div>
              )}

              {/* PAYMENT */}

              {activeSection ===
                "payments" && (
                <div className="settings-modal-content">

                  <div className="modal-heading">
                    <div className="modal-heading-icon">
                      <FiCreditCard />
                    </div>

                    <div>
                      <h2>
                        Payment Methods
                      </h2>

                      <p>
                        Manage your saved
                        payment methods
                      </p>
                    </div>
                  </div>

                  <div className="payment-list">

                    {paymentMethods.map(
                      (payment) => (
                        <div
                          className="payment-card"
                          key={payment.id}
                        >

                          <div className="payment-card-icon">
                            <FiCreditCard />
                          </div>

                          <div>
                            <strong>
                              {payment.type}
                            </strong>

                            <p>
                              {payment.value}
                            </p>
                          </div>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleRemovePayment(
                                payment.id
                              )
                            }
                          >
                            <FiTrash2 />
                          </button>

                        </div>
                      )
                    )}

                  </div>

                  {!showPaymentForm && (
                    <button
                      className="add-new-btn"
                      onClick={() =>
                        setShowPaymentForm(
                          true
                        )
                      }
                    >
                      <FiPlus />
                      Add Payment Method
                    </button>
                  )}

                  {showPaymentForm && (
                    <form
                      className="modal-form"
                      onSubmit={
                        handleAddPayment
                      }
                    >

                      <label>
                        Payment Type
                      </label>

                      <select
                        name="type"
                        value={
                          paymentForm.type
                        }
                        onChange={
                          handlePaymentChange
                        }
                      >
                        <option>
                          UPI
                        </option>

                        <option>
                          Card
                        </option>

                        <option>
                          Wallet
                        </option>
                      </select>

                      <label>
                        {paymentForm.type ===
                        "UPI"
                          ? "UPI ID"
                          : paymentForm.type ===
                            "Card"
                          ? "Card Number"
                          : "Wallet Number"}
                      </label>

                      <input
                        name="value"
                        value={
                          paymentForm.value
                        }
                        onChange={
                          handlePaymentChange
                        }
                        placeholder={
                          paymentForm.type ===
                          "UPI"
                            ? "example@upi"
                            : "Enter payment details"
                        }
                        required
                      />

                      <div className="modal-actions">

                        <button
                          type="button"
                          className="secondary-btn"
                          onClick={() =>
                            setShowPaymentForm(
                              false
                            )
                          }
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="primary-btn"
                        >
                          <FiCheck />
                          Save Payment
                        </button>

                      </div>

                    </form>
                  )}

                </div>
              )}

              {/* NOTIFICATIONS */}

              {activeSection ===
                "notifications" && (
                <div className="settings-modal-content">

                  <div className="modal-heading">
                    <div className="modal-heading-icon">
                      <FiBell />
                    </div>

                    <div>
                      <h2>
                        Notifications
                      </h2>

                      <p>
                        Manage your
                        notification
                        preferences
                      </p>
                    </div>
                  </div>

                  <div className="toggle-list">

                    <NotificationToggle
                      title="Order Updates"
                      description="Receive updates about your orders"
                      checked={
                        notifications.orderUpdates
                      }
                      onChange={() =>
                        toggleNotification(
                          "orderUpdates"
                        )
                      }
                    />

                    <NotificationToggle
                      title="Promotional Alerts"
                      description="Get updates about new products and offers"
                      checked={
                        notifications.promotions
                      }
                      onChange={() =>
                        toggleNotification(
                          "promotions"
                        )
                      }
                    />

                    <NotificationToggle
                      title="Special Offers"
                      description="Receive exclusive NOVA offers"
                      checked={
                        notifications.offers
                      }
                      onChange={() =>
                        toggleNotification(
                          "offers"
                        )
                      }
                    />

                    <NotificationToggle
                      title="Email Notifications"
                      description="Receive account notifications by email"
                      checked={
                        notifications.email
                      }
                      onChange={() =>
                        toggleNotification(
                          "email"
                        )
                      }
                    />

                    <NotificationToggle
                      title="SMS Notifications"
                      description="Receive important updates through SMS"
                      checked={
                        notifications.sms
                      }
                      onChange={() =>
                        toggleNotification(
                          "sms"
                        )
                      }
                    />

                  </div>

                </div>
              )}

              {/* SECURITY */}

              {activeSection ===
                "security" && (
                <div className="settings-modal-content">

                  <div className="modal-heading">
                    <div className="modal-heading-icon">
                      <FiShield />
                    </div>

                    <div>
                      <h2>
                        Privacy & Security
                      </h2>

                      <p>
                        Protect your NOVA
                        account
                      </p>
                    </div>
                  </div>

                  <div className="security-info">
                    <FiLock />

                    <div>
                      <strong>
                        Account Security
                      </strong>

                      <p>
                        Keep your password
                        secure and never
                        share it with anyone.
                      </p>
                    </div>
                  </div>

                  <form
                    className="modal-form"
                    onSubmit={
                      handleChangePassword
                    }
                  >

                    <label>
                      Current Password
                    </label>

                    <input
                      type="password"
                      name="currentPassword"
                      value={
                        security.currentPassword
                      }
                      onChange={
                        handleSecurityChange
                      }
                      placeholder="Current password"
                    />

                    <label>
                      New Password
                    </label>

                    <input
                      type="password"
                      name="newPassword"
                      value={
                        security.newPassword
                      }
                      onChange={
                        handleSecurityChange
                      }
                      placeholder="New password"
                    />

                    <label>
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      name="confirmPassword"
                      value={
                        security.confirmPassword
                      }
                      onChange={
                        handleSecurityChange
                      }
                      placeholder="Confirm new password"
                    />

                    {passwordMessage && (
                      <p className="form-message">
                        {passwordMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="primary-btn full-btn"
                    >
                      <FiLock />
                      Update Password
                    </button>

                  </form>

                </div>
              )}

              {/* SUPPORT */}

              {activeSection ===
                "support" && (
                <div className="settings-modal-content">

                  <div className="modal-heading">
                    <div className="modal-heading-icon">
                      <FiHelpCircle />
                    </div>

                    <div>
                      <h2>
                        Help & Support
                      </h2>

                      <p>
                        We're here to help
                      </p>
                    </div>
                  </div>

                  <div className="support-options">

                    <div className="support-option">
                      <FiPackage />

                      <div>
                        <strong>
                          Order Help
                        </strong>

                        <p>
                          Need help with an
                          existing order?
                        </p>
                      </div>
                    </div>

                    <div className="support-option">
                      <FiCreditCard />

                      <div>
                        <strong>
                          Payment Help
                        </strong>

                        <p>
                          Having trouble with
                          payment?
                        </p>
                      </div>
                    </div>

                    <div className="support-option">
                      <FiMail />

                      <div>
                        <strong>
                          Contact NOVA
                        </strong>

                        <p>
                          Send us your
                          questions.
                        </p>
                      </div>
                    </div>

                  </div>

                  <form
                    className="modal-form"
                    onSubmit={
                      handleSupportSubmit
                    }
                  >

                    <label>
                      How can we help?
                    </label>

                    <textarea
                      value={
                        supportMessage
                      }
                      onChange={(e) =>
                        setSupportMessage(
                          e.target.value
                        )
                      }
                      placeholder="Describe your issue..."
                      required
                    />

                    <button
                      type="submit"
                      className="primary-btn full-btn"
                    >
                      <FiMail />
                      Submit Request
                    </button>

                  </form>

                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </main>
  );
}

/* =========================================
   NOTIFICATION TOGGLE
========================================= */

function NotificationToggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="notification-toggle">

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <button
        type="button"
        className={
          checked
            ? "toggle active"
            : "toggle"
        }
        onClick={onChange}
        aria-label={`Toggle ${title}`}
      >
        <span />
      </button>

    </div>
  );
}

export default Settings;