import "./App.css";
import Page from "./components/Page";
import Header from "./components/Header";
import Bankadd from "./components/Bankadd";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Hesaplama from "./components/Hesaplama";
import {useState} from "react";

function App() {
  const [banks, setBanks] = useState([]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index path="/" element={<Page />} />
        <Route
          path="/hesaplama"
          element={<Hesaplama banks={banks} setBanks={setBanks} />}
        />
        <Route path="/bankadd" element={<Bankadd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
