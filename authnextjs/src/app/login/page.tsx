"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login successfull", response);
      router.push("/profile");
    } catch (error: any) {
      console.log("error : ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          {loading ? "Loading..." : "Login"}
        </h1>

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
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />

        {/* Button */}
        <button
          onClick={onLogin}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {buttonDisabled ? "No Login" : "Login"}
        </button>

        <p className="text-center text-gray-400 mt-4">
          <Link href="/signup" className="text-blue-400 hover:underline">
            Visit Signup Page
          </Link>
        </p>

        <p className="text-center text-gray-400 mt-4">
          <Link href="/forgotpasswordpage" className="text-blue-400 hover:underline">
            Forgot Password
          </Link>
        </p>
      </div>
    </div>
  );
}
