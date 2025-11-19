"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [tokenVerified, setTokenVerified] = useState(false);

  async function verifyTokenAndResetPassword() {
    try {
      const response = await axios.post("/api/users/forgotpassword/verify", {
        token,
        newPassword: password,
      });
      if (!response.data.success) {
        setTokenVerified(false);
      }

      setTokenVerified(true);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    setPassword(password);
  }, [password]);

  useEffect(() => {
    const tokenn = window.location.search.split("=")[1];
    setToken(tokenn || "");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-center text-white mb-4">
          {tokenVerified ? "Token Verified Successfully" : "Token Not Verified"}
        </h1>

        <label className="text-gray-300 mb-1 block">Enter New Password</label>

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="New password"
        />

        <button
          onClick={verifyTokenAndResetPassword}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
