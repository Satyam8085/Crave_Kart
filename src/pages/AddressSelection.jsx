import React, { useState } from "react";

function AddressSelection({ onAddressSelect }) {
  const [addresses, setAddresses] = useState([
    "123 MG Road, Delhi",
    "45 Park Street, Kolkata"
  ]);
  const [selected, setSelected] = useState(null);
  const [newAddress, setNewAddress] = useState("");

  const handleAddAddress = () => {
    if (newAddress.trim() !== "") {
      setAddresses([...addresses, newAddress]);
      setNewAddress("");
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-3">Select Delivery Address</h2>
      
      <div className="flex flex-col gap-2">
        {addresses.map((addr, index) => (
          <label
            key={index}
            className={`p-2 border rounded-lg cursor-pointer ${
              selected === addr ? "border-green-500 bg-green-50" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="address"
              value={addr}
              className="mr-2"
              checked={selected === addr}
              onChange={() => {
                setSelected(addr);
                onAddressSelect(addr);
              }}
            />
            {addr}
          </label>
        ))}
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter new address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="w-full border p-2 rounded-lg mb-2"
        />
        <button
          onClick={handleAddAddress}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Add Address
        </button>
      </div>
    </div>
  );
}

export default AddressSelection;
