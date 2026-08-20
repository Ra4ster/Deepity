import EnergyBackground from "./components/EnergyBackground";
import Navbar from "./components/Navbar";

import HomePage from "./HomePage";
import TutorialPage from "./TutorialPage";
import NotFound from "./NotFound";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import GettingStartedPython from "./tutorials/python/GettingStarted";
import InstallationPython from "./tutorials/python/Installation";
import YourFirstPCNPython from "./tutorials/python/YourFirstPCN";
import GettingStartedCpp from "./tutorials/cpp/GettingStarted";
import InstallationCpp from "./tutorials/cpp/Installation";
import YourFirstPCNCpp from "./tutorials/cpp/YourFirstPCN";

export default function App() {
  return (
    <>
      <EnergyBackground opacity="1.0" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <BrowserRouter basename="/Deepity">
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/tutorials"
              element={<TutorialPage language="python" />}
            />
            {/* Python Tutorials */}
            <Route
              path="/tutorials/python"
              element={<TutorialPage language="python" />}
            />
            <Route
              path="/tutorials/python/GettingStarted"
              element={<GettingStartedPython />}
            />
            <Route
              path="/tutorials/python/Installation"
              element={<InstallationPython />}
            />
            <Route
              path="/tutorials/python/your-first-pcn"
              element={<YourFirstPCNPython />}
            />
            {/* C++ Tutorials */}
            <Route
              path="/tutorials/cpp"
              element={<TutorialPage language="cpp" />}
            />
            <Route
              path="/tutorials/cpp/GettingStarted"
              element={<GettingStartedCpp />}
            />
            <Route
              path="/tutorials/cpp/Installation"
              element={<InstallationCpp />}
            />
            <Route
              path="/tutorials/python/your-first-pcn"
              element={<YourFirstPCNPython />}
            />
            <Route path="/notfound" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
