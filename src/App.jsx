import EnergyBackground from "./components/EnergyBackground";
import Navbar from "./components/Navbar";

import HomePage from "./HomePage";
import TutorialPage from "./TutorialPage";
import NotFound from "./NotFound";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import GettingStartedPython from "./tutorials/python/GettingStarted";
import GettingStartedCpp from "./tutorials/cpp/GettingStarted";
import InstallationPython from "./tutorials/python/Installation";
import InstallationCpp from "./tutorials/cpp/Installation";
import YourFirstPCNPython from "./tutorials/python/YourFirstPCN";
import YourFirstPCNCpp from "./tutorials/cpp/YourFirstPCN";
import TrainingCpp from "./tutorials/cpp/TrainingFirst";
import TrainingPython from "./tutorials/python/TrainingFirst";
import MakingPredictionsCpp from "./tutorials/cpp/MakingPredictions";
import MakingPredictionsPython from "./tutorials/python/Makingpredictions";

import PredictiveCoding101 from "./tutorials/core/PredictiveCoding101";
import EnergyMinimization from "./tutorials/core/EnergyMinimization";
import LayersConnections from "./tutorials/core/LayersConnections";
import Activations from "./tutorials/core/Activations";
import BatchedComputation from "./tutorials/core/BatchedComputation";

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
      <EnergyBackground opacity="1.0" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <BrowserRouter basename="/Deepity">
          <ScrollToTop />
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
            <Route
              path="/tutorials/python/training-a-pcn"
              element={<TrainingPython />}
            />
            <Route
              path="/tutorials/python/making-predictions"
              element={<MakingPredictionsPython />}
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
              path="/tutorials/cpp/your-first-pcn"
              element={<YourFirstPCNCpp />}
            />
            <Route
              path="/tutorials/cpp/training-a-pcn"
              element={<TrainingCpp />}
            />
            <Route
              path="/tutorials/cpp/making-predictions"
              element={<MakingPredictionsCpp />}
            />
            {/* Core */}
            <Route
              path="/tutorials/predictive-coding-101"
              element={<PredictiveCoding101 />}
            />
            <Route
              path="/tutorials/energy-minimization"
              element={<EnergyMinimization />}
            />
            <Route
              path="/tutorials/layers-connections"
              element={<LayersConnections />}
            />

            <Route path="/tutorials/activations" element={<Activations />} />

            <Route
              path="tutorials/batched-computation"
              element={<BatchedComputation />}
            />
            <Route path="/notfound" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
