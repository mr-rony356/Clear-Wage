import React, { createContext, useState, useContext } from 'react';

// StepDataContext creation
 export const StepDataContext = createContext();

// StepDataProvider component
export const StepDataProvider = ({ children }) => {
  const [stepData, setStepData] = useState([]);

  // Function to add step data to the array
  const addStepData = (data) => {
    setStepData([...stepData, data]);
  };
  console.log(stepData)
  // Function to reset step data array
  const resetStepData = () => {
    setStepData([]);
  };

  // Value provided by the context
  const value = {
    stepData,
    addStepData,
    resetStepData,
  };

  return (
    <StepDataContext.Provider value={value}>
      {children}
    </StepDataContext.Provider>
  );
};

// Custom hook to access the StepDataContext
export const useStepData = () => useContext(StepDataContext);

export default StepDataContext;
