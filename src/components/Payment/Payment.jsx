import React, { useState } from 'react';
import axios from "axios";
import "./payment.scss";

// The backend URL deployed on Render
const API_BASE_URL = "https://mpesa200.onrender.com"; 

export default function Payment() {
  const [phone, setPhone] = useState(""); // Phone number state
  const [amount, setAmount] = useState(""); // Amount state
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Message state for user feedback

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear any existing message

    try {
      // Sending the phone number and amount to the backend API
      const response = await axios.post(`${API_BASE_URL}/stk`, {
        phone,
        amount,
      });

      // Show success message
      setMessage("STK Push Sent! Check your phone.");
    } catch (error) {
      // If error occurs, show failure message
      setMessage("Payment Failed. Try again.");
      console.error(error);
    } finally {
      // End loading state
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>MPESA Payment</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <input
          type="text"
          placeholder="Enter Phone Number (07...)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)} // Update phone number on input
          required
        />
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)} // Update amount on input
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay with MPESA"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}