import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaHome, FaShoppingCart } from "react-icons/fa";
import Nav from "../Components/Nav";

function OrderPlaced() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const colors = ["#FBBF24", "#34D399", "#60A5FA", "#F87171", "#A78BFA", "#F472B6"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Nav />

      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        
        {/* Confetti Animation */}
        {showConfetti &&
          Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                borderRadius: "50%",
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}

        {/* Success Card */}
        <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-3xl shadow-2xl text-center max-w-md w-full relative z-10 animate-fadeIn border border-gray-100 dark:border-gray-700">
          
          {/* Success Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-pulse">
              <FaCheckCircle className="text-6xl text-green-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-2xl">🎉</span>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Order Placed Successfully!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
            Thank you for your order! Your delicious food is being prepared and will be delivered to you shortly. 🍔🍕
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Details
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span className="font-mono">#ORD{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                <span>30-45 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">Confirmed</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <FaHome className="w-5 h-5" />
              <span>Back to Menu</span>
            </button>
            
            <button
              onClick={() => navigate("/cart")}
              className="w-full border-2 border-green-500 text-green-600 dark:text-green-400 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <FaShoppingCart className="w-5 h-5" />
              <span>View Cart</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You will receive a confirmation SMS shortly with tracking details.
            </p>
          </div>
        </div>

        {/* Custom CSS for fadeIn animation */}
        <style jsx>{`
          @keyframes fadeIn {
            from { 
              opacity: 0; 
              transform: translateY(-20px) scale(0.95); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0) scale(1); 
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
}

export default OrderPlaced;