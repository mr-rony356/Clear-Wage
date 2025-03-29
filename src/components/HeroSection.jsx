import React from "react";
import { styled, useTheme, useMediaQuery, Button } from "@mui/material";
import ButtonStyled from "./ButtonWrapper";

function HeroSection() {
  const handleContributionStatus = () => {
    localStorage.setItem("hasContributed", "true");
    window.scrollTo({
      top: document.getElementById("last").offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center  mt-[80px] mb-[30px]">
      <h1 className="lg:text-[80px] text-[45px] font-bold text-center w-full lg:max-w-[800px] leading-[1.3]">
        What Are Other Attorneys With Your Experience Making?
      </h1>
      <div className="flex-center">
        <p className="lg:text-[22px] text-[18px] font-[500] my-[48px]">
          Add Your Anonymous Salary To Find Out!
        </p>
      </div>
      <ButtonStyled openModal={true} bgColor="#473AFF">
        🔓 Unlock Salary Data →
      </ButtonStyled>
      {/* <div
        onClick={handleContributionStatus}
        style={{
          fontSize: ".8rem",
          fontWeight: "bold",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        I already added my salary →
      </div> */}
    </div>
  );
}

export default HeroSection;
