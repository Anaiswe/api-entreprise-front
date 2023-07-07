// import PKG
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// components
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Details from "./pages/Details/Details";
import Switch from "./components/Switch/Switch";

//styles
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

  return (
    <>
       <div className={`container-fluid ${theme}`}>
       <div className="App">
        < Switch theme={theme} toggleTheme={toggleTheme} />
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/Details/:siret" element={<Details />}></Route>
            </Routes>
            <Footer />
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
