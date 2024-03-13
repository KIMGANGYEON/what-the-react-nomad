import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
function Hello() {
  // function byFn() {
  //   console.log("BYE");
  // }
  // function helloFn() {
  //   console.log("HELLO");
  //   return byFn;
  // }
  useEffect(function () {
    console.log("hi");
    return () => {
      console.log("bye");
    };
  }, []);
  return <h1>Hello!!!</h1>;
}

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showing, setShowing] = useState(false);

  const onClick = () => setValue((prev) => prev + 1);
  const onClick2 = () => setShowing((prev) => !prev);
  const onChange = (event) => setKeyword(event.target.value);
  // console.log("render");
  useEffect(() => {
    console.log("call");
  }, []);
  useEffect(() => {
    if (keyword !== "" && keyword.length > 5) {
      console.log("render2", keyword);
    }
  }, [keyword]);
  useEffect(() => {
    console.log("call counter");
  }, [counter, keyword]);
  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here."
      />
      <h1 className={styles.title}>{counter}</h1>
      <Button text={"good"} />
      <button onClick={onClick}>click!</button>
      <div>
        {showing ? <Hello /> : null}
        <button onClick={onClick2}>{showing ? "Hide" : "show"}</button>
      </div>
    </div>
  );
}

// export default App;
