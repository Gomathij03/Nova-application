const STORAGE_KEYS = {
  USER: "nova_user",
  CART: "nova_cart",
  WISHLIST: "nova_wishlist",
  SETTINGS: "nova_settings",
};

export const getStorage = (key, fallback = null) => {
  try {
    const value = localStorage.getItem(key);

    if (value === null) {
      return fallback;
    }

    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeStorage = (key) => {
  localStorage.removeItem(key);
};

export { STORAGE_KEYS };