import { useState } from "react";
import "./App.css";

function App() {
  // let counter = 15;
  const [counter, setCounter] = useState(15);

  function addValue() {
    setCounter(counter + 1);
    // counter++
    // console.log(counter)
  }

  function removeValue() {
    setCounter(counter - 1);
  }

  return (
    <>
      <h1>react course with new {counter}</h1>
      <h2>counter value: {counter}</h2>
      <button onClick={addValue}>Add value</button>{" "}
      <button onClick={removeValue}>remove value</button>
      <p>footer: {counter}</p>
    </>
  );
}

export default App;
