import React, { useContext, useState, useEffect } from "react";
import Nav from "../Components/Nav";
import categories from "./Category";
import Card from "../Components/Card";
import { food_items } from "./food_item";
import { datacontext } from "../Context/UserContext";

function Home() {
  const { input } = useContext(datacontext);
  const [cate, setCate] = useState(food_items);
  const [activeCategory, setActiveCategory] = useState("All");

  const normalize = (str) => str.toLowerCase().replace(/[\s_]/g, "");

  const filter = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setCate(food_items);
    } else {
      const newlist = food_items.filter(
        (item) => normalize(item.food_category) === normalize(category)
      );
      setCate(newlist);
    }
  };

  useEffect(() => {
    if (input === "") {
      filter(activeCategory);
    } else {
      const filtered = food_items.filter((item) =>
        item.food_name.toLowerCase().includes(input.toLowerCase())
      );
      setCate(filtered);
    }
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Nav />

      {/* Hero Section (functional with background images) */}
      <div className="relative overflow-hidden">
        {/* Collage background of many bright food photos */}
        <div className="absolute inset-0 opacity-40 blur-[0.5px] scale-[1.01]">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 w-full h-full p-2">
            <img src="/src/assets/image9.avif" alt="food" className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg saturate-150 brightness-110" />
            <img src="/src/assets/image8.avif" alt="food" className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg saturate-150 brightness-110" />
            <img src="/src/assets/image14.webp" alt="food" className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg saturate-150 brightness-110" />
            <img src="/src/assets/image20.avif" alt="food" className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg saturate-150 brightness-110" />
            <img src="/src/assets/image3.avif" alt="food" className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg saturate-150 brightness-110" />
            <img src="/src/assets/image11.avif" alt="food" className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg saturate-150 brightness-110" />
            <img src="/src/assets/image1.avif" alt="food" className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg saturate-150 brightness-110" />
            <img src="/src/assets/image10.avif" alt="food" className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg saturate-150 brightness-110" />
            <img src="/src/assets/image6.avif" alt="food" className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg saturate-150 brightness-110" />
            <img src="/src/assets/image5.avif" alt="food" className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg saturate-150 brightness-110" />
            <img src="/src/assets/image21.avif" alt="food" className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg saturate-150 brightness-110 hidden md:block" />
            <img src="/src/assets/image25.avif" alt="food" className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg saturate-150 brightness-110 hidden md:block" />
          </div>
        </div>
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-emerald-500/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Delicious Food
              <span className="block text-yellow-300">Delivered Fast</span>
            </h1>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Order from your favorite restaurants and get it delivered to your doorstep in minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#menu" className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                Order Now
              </a>
              <a href="#categories" className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200">
                View Menu
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Choose from our wide variety of delicious food categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-6">
          {categories.map((item) => (
            <button
              key={item.id}
              onClick={() => filter(item.name)}
              className={`group flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                activeCategory === item.name
                  ? "bg-green-500 text-white shadow-lg scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 shadow-md"
              }`}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                {item.Icon}
              </div>
              <span className="text-xs sm:text-sm font-medium text-center capitalize">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Food Items Section */}
      <div id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {activeCategory === "All" ? "All Items" : activeCategory}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {cate.length} delicious items available
          </p>
        </div>

        {/* No Items Found */}
        {cate.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No items found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {input ? `No items match "${input}"` : `No items in ${activeCategory} category`}
            </p>
            {input && (
              <button
                onClick={() => window.location.reload()}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Food Items Grid */}
        {cate.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {cate.map((item, index) => (
              <Card
                key={index}
                name={item.food_name}
                image={item.food_image}
                id={item.id}
                price={item.price}
                type={item.food_type}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;