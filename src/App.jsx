import EnergyBackground from "./components/EnergyBackground";
import Navbar from "./components/Navbar";
import HomePage from "./HomePage";
import NotFound from "./NotFound";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <EnergyBackground opacity="0.75" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <BrowserRouter basename="/Deepity">
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
