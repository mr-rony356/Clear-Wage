import React from "react";
import { styled, useTheme, useMediaQuery, Button } from "@mui/material";
import ButtonStyled from "./ButtonWrapper ";

const HeroWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  color: "white",
  width: "95%",
}));

export const Title = styled("h1")(({ theme }) => ({
  fontSize: theme.breakpoints.down("sm") ? "2.5rem" : "5rem",
  marginBottom: "20px",
  fontWeight: "900",
  fontFamily: "Freight Black, Times New Roman, Times, serif",
}));

export const Subtitle = styled("p")({
  fontSize: "1.1rem",
  marginBottom: "30px",
  maxWidth: "650px",
});

function HeroSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <HeroWrapper>
      <Title>Salary Transparency For Attorneys</Title>
      <div className="flex-center">
        <Subtitle style={{ maxWidth: isMobile ? "100%" : "70%" }}>
          Empowering Attorneys with Real Salary Data to Compare Compensation
        </Subtitle>
      </div>
      <ButtonStyled openModal={true} bgColor="#b59658">
        Contribute Salary
      </ButtonStyled>
      <ButtonStyled scrollToSection={true} bgColor="white">
        View Data
      </ButtonStyled>
    </HeroWrapper>
  );
}

export default HeroSection;
