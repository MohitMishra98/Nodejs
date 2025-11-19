"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup successful", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup error : ", error.message);
      // toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
    <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
      <h1 className="text-3xl font-semibold text-center text-white mb-2">
        {loading ? "Processing..." : "Signup"}
      </h1>

      <hr className="border-gray-700 mb-6" />

      {/* Username */}
      <label htmlFor="username" className="text-gray-300 mb-1 block">
        Username
      </label>
      <input
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter your username"
      />

      {/* Email */}
      <label htmlFor="email" className="text-gray-300 mb-1 block">
        Email
      </label>
      <input
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
      />

      {/* Password */}
      <label htmlFor="password" className="text-gray-300 mb-1 block">
        Password
      </label>
      <input
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg mb-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your password"
      />

      {/* Button */}
      <button
        onClick={onSignup}
        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>

      <p className="text-center text-gray-400 mt-4">
        <Link href="/login" className="text-blue-400 hover:underline">
          Visit Login Page
        </Link>
      </p>
    </div>
  </div>
);

}
