import React from "react";
import { styled, useTheme, useMediaQuery, Button } from "@mui/material";
import ButtonStyled from "./ButtonWrapper";

function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center  mt-[80px] mb-[30px]">
      <h1
        className="display-1 fw-bolder mt-5  mx-auto text-center"
        style={{ maxWidth: "850px", margin: "0 auto" }}
      >
        What Are Other Attorneys With Your Experience Making?
      </h1>
      <div className="flex-center">
        <h4 className="fw-medium mt-5 mb-5 text-[22px] text-center">
          Add Your Anonymous Salary To Find Out!
        </h4>
      </div>
      <ButtonStyled openModal={true} bgColor="#473AFF">
        🔓 Unlock Salary Data →
      </ButtonStyled>
    </div>
  );
}

export default HeroSection;
