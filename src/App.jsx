import EnergyBackground from "./components/EnergyBackground";
import Navbar from "./components/Navbar";

import HomePage from "./HomePage";
import TutorialPage from "./TutorialPage";
import NotFound from "./NotFound";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <EnergyBackground opacity="1.0" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <BrowserRouter basename="/Deepity">
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tutorials" element={<TutorialPage />} />
            <Route path="/error" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
