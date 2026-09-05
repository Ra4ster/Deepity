import Navbar from "./components/Navbar";
import HomePage from "./HomePage";
import NotFound from "./NotFound";
import "./index.css";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import TutorialLanding from "./TutorialLanding";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <div style={{ position: "relative", zIndex: 1 }}>
        <BrowserRouter basename="/Deepity">
          <ScrollToTop />
          <Navbar />

          <main>
            <Routes>
              <Route path="" element={<HomePage />} />
              <Route path="/tutorial" element={<TutorialLanding />} />
              <Route path="/notfound" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}
