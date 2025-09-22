import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { datacontext } from "../Context/UserContext";
import { FaCreditCard, FaMoneyBillWave, FaQrcode, FaMapMarkerAlt, FaPlus, FaArrowLeft } from "react-icons/fa";
import Nav from "../Components/Nav";

const Checkout = () => {
  const { cart } = useContext(datacontext);
  const navigate = useNavigate();

  // Address States
  const [addresses, setAddresses] = useState([
    "123 MG Road, Delhi",
    "45 Park Street, Kolkata"
  ]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");

  // Payment States
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiProcessing, setUpiProcessing] = useState(false);
  const [upiCountdown, setUpiCountdown] = useState(60);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.05;

  const handlePayment = (e) => {
    e.preventDefault();

    if (!selectedAddress) {
      alert("Please select or add a delivery address.");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardNumber || !cvv || !name) {
        alert("Please fill all card details");
        return;
      }
      navigate("/order-placed");
    } else if (paymentMethod === "upi") {
      if (!upiId) {
        alert("Please enter your UPI ID");
        return;
      }
      setUpiProcessing(true);
      setUpiCountdown(60);
    } else if (paymentMethod === "cod") {
      navigate("/order-placed");
    }
  };

  useEffect(() => {
    let timer;
    if (upiProcessing && upiCountdown > 0) {
      timer = setTimeout(() => setUpiCountdown(upiCountdown - 1), 1000);
    } else if (upiProcessing && upiCountdown === 0) {
      navigate("/order-placed");
    }
    return () => clearTimeout(timer);
  }, [upiProcessing, upiCountdown, navigate]);

  const addNewAddress = () => {
    if (newAddress.trim() !== "") {
      setAddresses([...addresses, newAddress]);
      setSelectedAddress(newAddress);
      setNewAddress("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Nav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/cart")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Checkout
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Complete your order
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Address Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-3">
                <FaMapMarkerAlt className="text-green-500" />
                <span>Delivery Address</span>
              </h2>
              
              <div className="space-y-4">
                {addresses.map((addr, index) => (
                  <label
                    key={index}
                    className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedAddress === addr
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={addr}
                      checked={selectedAddress === addr}
                      onChange={() => setSelectedAddress(addr)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedAddress === addr
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}>
                        {selectedAddress === addr && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        )}
                      </div>
                      <span className="text-gray-900 dark:text-white">{addr}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Add New Address */}
              <div className="mt-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Add New Address
                </h3>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Enter new address"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addNewAddress}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <FaPlus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Payment Method
              </h2>

              {upiProcessing ? (
                /* UPI Processing */
                <div className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <FaQrcode className="text-6xl text-green-500 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Complete UPI Payment
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Processing... ⏳ {upiCountdown}s
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    After payment, your order will be placed automatically.
                  </p>
                </div>
              ) : (
                /* Payment Form */
                <form onSubmit={handlePayment} className="space-y-6">
                  
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                        paymentMethod === "card"
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <FaCreditCard className="text-3xl text-green-500" />
                        <span className="font-semibold text-gray-900 dark:text-white">Card</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                        paymentMethod === "upi"
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <FaQrcode className="text-3xl text-green-500" />
                        <span className="font-semibold text-gray-900 dark:text-white">UPI</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                        paymentMethod === "cod"
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <FaMoneyBillWave className="text-3xl text-green-500" />
                        <span className="font-semibold text-gray-900 dark:text-white">COD</span>
                      </div>
                    </button>
                  </div>

                  {/* Payment Fields */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          placeholder="Enter name on card"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <p className="text-blue-800 dark:text-blue-200">
                        💰 You will pay in cash when the delivery arrives.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={item.food_image || item.image}
                        alt={item.food_name || item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {item.food_name || item.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{(total / 1.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (5%)</span>
                  <span>₹{(total * 0.05 / 1.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery</span>
                  <span className="text-green-600 dark:text-green-400">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-600 pt-3">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;