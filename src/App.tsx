import "./index.css";
import Body from "./components/Body";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <div className=" flex flex-row justify-center items-center min-h-screen">
        <Body />
      </div>
    );
  }
}

export default App;
