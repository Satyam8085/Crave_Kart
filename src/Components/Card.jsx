import React, { useContext } from "react";
import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { datacontext } from "../Context/UserContext";

function Card({ id, name, image, price, type }) {
  const { addToCart } = useContext(datacontext);
  const isVeg = type?.toLowerCase() === "veg";

  const item = { 
    id, 
    food_name: name, 
    food_image: image, 
    price: Number(price), 
    food_type: type 
  };

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-2">
      
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            ₹{price}
          </span>
        </div>

        {/* (removed badge on image as requested) */}

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-200 flex items-center space-x-2"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
          {name}
        </h3>
        {/* Veg/Non-Veg indicator below the name (logo + text) */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 ${
              isVeg ? "border-green-500" : "border-red-500"
            }`}
            title={isVeg ? "Veg" : "Non-Veg"}
          >
            {isVeg ? (
              <LuLeafyGreen className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <GiChickenOven className="w-3.5 h-3.5 text-red-600" />
            )}
          </span>
          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            {isVeg ? "Veg" : "Non-Veg"}
          </span>
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center space-x-2"
          >
            <FaPlus className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;