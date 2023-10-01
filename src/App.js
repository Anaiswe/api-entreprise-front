// import PKG
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//function
import { useTheme } from "./functions/SetTheme";
import { DataProvider } from "./functions/DataContext";

// components
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Details from "./pages/Details/Details";



//styles
import "./index.css";
import "./App.css";

function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
       <div className={`container-fluid-${theme}`}>
       <div className="App">
          <Router>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <DataProvider>
            <Routes>
            <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />}></Route> 
            <Route path="/Details/:id"
                  element={<Details theme={theme} toggleTheme={toggleTheme} />}
                />
            </Routes>
            </DataProvider>
            <Footer />
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
