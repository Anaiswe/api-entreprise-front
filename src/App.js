// import PKG
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//states
import { useState } from "react";

//function
import { useTheme } from "./functions/SetTheme";
import { SelectedItemProvider } from "./functions/SelectedItemContext";

// components
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Details from "./pages/Details/Details";
import Test from "./pages/Test/Test";
import SwitchTheme from "./components/SwitchTheme/SwitchTheme";


//styles
import "./index.css";
import "./App.css";

function App() {
  const [theme, toggleTheme] = useTheme();
  // const [selectedItem, setSelectedItem] = useState(null); // Ici, nous définissons le state
  const selectedEntreprise = 2;
  console.log("THIS SELECTED ENTReprISE :", selectedEntreprise);

  return (
    <>
       <div className={`container-fluid-${theme}`}>
       <div className="App">
        < SwitchTheme theme={theme} toggleTheme={toggleTheme} />
          <Router>
            <Header theme={theme} toggleTheme={toggleTheme} />
            {/* <DataProvider> */}
            <SelectedItemProvider selectedEntreprise={selectedEntreprise}>
            <Routes>
           
              <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />}></Route>
              <Route path="/Details/:siret" element={<Details theme={theme} toggleTheme={toggleTheme} />}></Route>
              {/* <Route path="/Test/:id" element={<Test />}></Route> */}
              <Route path="/Test" element={<Test  />}></Route>
            
            </Routes>
            </SelectedItemProvider >
            {/* </DataProvider> */}
            <Footer />
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
