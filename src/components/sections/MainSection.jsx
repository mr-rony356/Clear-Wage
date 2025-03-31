import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const MiuiSection = styled(Box)(({ theme }) => ({
  position: "relative",
}));

function MainSection({ children }) {
  return <MiuiSection>{children}</MiuiSection>;
}

export default MainSection;
