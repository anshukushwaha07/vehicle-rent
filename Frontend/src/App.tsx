import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import ColorTest from "./pages/ColorTest";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testColor" element={<ColorTest />} />
      </Routes>
    </>
  );
}

export default App;
