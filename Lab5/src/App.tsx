import "./App.css";
import Information from "./components/Information";
import MyButton from "./components/MyButton";

function App() {
  return (
    <div>
      <span>Hello World</span>
      <Information home="Turkey" study="HCI" like="Chess" />
      <MyButton />
    </div>
  );
}

export default App;
