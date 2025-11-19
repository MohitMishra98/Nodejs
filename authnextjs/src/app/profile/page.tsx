"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("user logged out successfull");
      router.push("/login");
    } catch (error: any) {
      console.log("error : ", error.message);
    }
  };

  const getUserDatails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <>
      <h1>Profile Page</h1>
      <h2>
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data}`}>Link</Link>
        )}
      </h2>
      <button onClick={logout}>Logout</button>
      <button onClick={getUserDatails}>Get User Details</button>
    </>
  );
}
