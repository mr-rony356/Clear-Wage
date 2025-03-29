import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const MiuiSection = styled(Box)(({ theme }) => ({
  minHeight: "50vh",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    minHeight: "70vh",
  },
}));

function MainSection({ children }) {
  return <MiuiSection>{children}</MiuiSection>;
}

export default MainSection;
