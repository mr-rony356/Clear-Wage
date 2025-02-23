import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { StepDataProvider } from "./context/stepsData"; // Importing StepDataProvider from your StepDataContext file
import PrivacyPolicy from "./components/Privacy";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <StepDataProvider>
        {" "}
        {/* Wrap your App component with the StepDataProvider */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </StepDataProvider>
    </BrowserRouter>
  );
}

export default App;
