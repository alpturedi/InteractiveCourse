import { useContext } from "react";
import { CountContext } from "../context";

export default function Button() {
  const level = useContext(CountContext);
  return <button>Click me {level}</button>;
}
