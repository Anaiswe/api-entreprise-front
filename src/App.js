// import PKG
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

//function
import { useTheme } from "./functions/SetTheme";
import { DataProvider } from "./functions/DataContext";

// components
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Details from "./pages/Details/Details";
import Recherche from "./pages/Recherche/Recherche";
import ContactForm from "./components/ContactForm/ContactForm";



//styles
import "./index.css";
import "./App.css";

function App() {
  const [theme, toggleTheme] = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <>
       <div className={`container-fluid-${theme}`}>
       <div className="App">
          <Router>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <div className="main-content">
            <DataProvider>
            <Routes>
            <Route path="/" element={<Home theme={theme}  />}></Route> 
            <Route path="/recherche" element={<Recherche theme={theme} />}></Route>
            <Route path="/Details/:id"
                  element={<Details theme={theme} toggleTheme={toggleTheme} />}
                />
            </Routes>
            </DataProvider>
            </div>
            <Footer visible={visible} setVisible={setVisible} />
            {visible ? (
                <ContactForm onClose={() => setVisible(false)} />
                ) : null}
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
