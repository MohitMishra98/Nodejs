"use client";

import React, { useState } from "react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  async function sendForgotEmail() {
    try {
      const response = await axios.post("/api/users/forgotpassword/sendmail", {
        email,
      });

      if (response.data.status === 400) {
        setInvalidEmail(true);
        console.log("user with email not found");
        return;
      }

      setInvalidEmail(false);
      setEmailSent(true);
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-center text-white mb-6">
          Forgot Password
        </h1>

        <label className="text-gray-300 mb-1 block">Enter your email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="your@email.com"
        />

        <button
          onClick={sendForgotEmail}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Send Email
        </button>

        {invalidEmail && (
          <p className="mt-4 bg-red-600 text-white p-2 rounded-lg text-center">
            User with this email does not exist
          </p>
        )}

        {emailSent && (
          <p className="mt-4 bg-green-600 text-white p-2 rounded-lg text-center">
            Email sent successfully
          </p>
        )}
      </div>
    </div>
  );
}
