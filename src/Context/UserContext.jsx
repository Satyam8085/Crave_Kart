import React, { createContext, useState, useEffect } from "react";

export const datacontext = createContext();

function UserContextProvider({ children }) {
  const [input, setInput] = useState("");
  const [cart, setCart] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update quantity of a cart item
  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: qty } : item
        )
      );
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Load cart and theme from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedTheme = localStorage.getItem("theme");
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.className = "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-200";
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.className = "bg-gradient-to-b from-green-50 via-white to-green-50 text-gray-800";
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const data = {
    input,
    setInput,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <datacontext.Provider value={data}>
      {children}
    </datacontext.Provider>
  );
}

export default UserContextProvider;