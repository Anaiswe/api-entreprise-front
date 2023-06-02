// https://codesandbox.io/s/8byi0?file=/src/components/sub-components/Footer.js
// https://codesandbox.io/s/cpiuw?file=/src/App.css:1127-1207
// import PKG
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
//import { useState } from "react";

//import pages
// import components et des routes
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import TestPage from "./pages/TestPage";
// import library (éventuellement)
//import { library } from "@fortawesome/fontawesome-svg-core";
import "./index.css";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("bg-dark");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("bg-dark");
    } else {
      setTheme("light");
    }
  };

  const johnnyTheme = () => {
    if (theme === "light" || "bg-dark") {
      setTheme("johnny");
    }
    if (theme === "johnny") {
      setTheme("bg-dark");
    }
  };

  return (
    <>
      <div class="container-fluid bg-dark text-white">
        <div className={`App ${theme}`}>
          {" "}
           <button onClick={toggleTheme}>Toggle Theme</button>
                <h1>Hello, world!</h1>
          <button onClick={johnnyTheme}>JOHNNY</button>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              {/* <Route path="/test" element={<TestPage/>}></Route> */}
            </Routes>
            <Footer />
            <span>YO</span>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
