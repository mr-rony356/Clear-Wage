import React from 'react';
import Home from './components/Home';
import { StepDataProvider } from './context/stepsData'; // Importing StepDataProvider from your StepDataContext file

function App() {
  return (
    <StepDataProvider> {/* Wrap your App component with the StepDataProvider */}
      <Home />
    </StepDataProvider>
  );
}

export default App;
