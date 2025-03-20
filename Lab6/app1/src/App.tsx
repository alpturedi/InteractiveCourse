import { useState } from "react";
import Button from "./components/Button";
import { CountContext } from "./context";

function App() {
  const [count, _setCount] = useState(0);

  return (
    <div className="w-[100vw] text-center mx-auto my-0 p-8">
      <span>Count is {count}</span>
      <br />
      <CountContext.Provider value={count}>
        <Button />
        <Button />
      </CountContext.Provider>
    </div>
  );
}

export default App;
