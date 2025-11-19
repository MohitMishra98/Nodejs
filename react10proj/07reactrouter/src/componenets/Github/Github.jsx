import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

function GitHub() {
  const data = useLoaderData();
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     fetch("https://api.github.com/users/hiteshchoudhary")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setData(data);
  //         console.log(data);
  //       });
  //   }, []);
  return (
    <>
      <h1>GitHub followers:{data.followers}</h1>
      <img src={data.avatar_url} alt="imagelod" />
    </>
  );
}

export default GitHub;

export const githubInfoLoader = async () => {
  console.log("called");
  const response = await fetch("https://api.github.com/users/hiteshchoudhary");
  return response.json();
};
