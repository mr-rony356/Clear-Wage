import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DrawerAppBar from "./components/AppBar";
import Home from "./components/Home";
import { StepDataProvider } from "./context/stepsData"; // Importing StepDataProvider from your StepDataContext file
import PrivacyPolicy from "./components/Privacy";
import About from "./components/About";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <StepDataProvider>
        <div className="relative">
          {/* Navigation - highest z-index */}
          <div className="relative z-[9999]">
            <DrawerAppBar />
          </div>
          
          {/* Main content - lower z-index */}
          <div className="relative z-[1]">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </div>
        </div>
      </StepDataProvider>
      <Footer />
    </Router>
  );
}

export default App;
