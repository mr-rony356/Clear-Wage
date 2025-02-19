import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const MiuiSection = styled(Box)(({ theme }) => ({
  background:
    "linear-gradient(rgb(37 37 37 / 90%), rgb(10 14 19 / 64%)), url(/bg1.jpg) 50% no-repeat",
  backgroundSize: "cover",
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
