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
  marginTop: "40px",
  fontWeight: "900",
  fontFamily: "Freight Black, Times New Roman, Times, serif",
}));

export const Subtitle = styled("p")({
  fontSize: "1.1rem",
  marginBottom: "30px",
  maxWidth: "650px",
  lineHeight: "28px",
});

function HeroSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleContributionStatus = () => {
    localStorage.setItem("hasContributed", "true");
    window.scrollTo({
      top: document.getElementById("last").offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <HeroWrapper>
      <Title>
        What Are Other Attorneys With <br /> Your Experience Making?
      </Title>
      <div className="flex-center">
        <Subtitle style={{ maxWidth: isMobile ? "100%" : "70%" }}>
          Add Your Anonymous Salary To Find Out!
        </Subtitle>
      </div>
      <ButtonStyled openModal={true} bgColor="#b59658">
        Unlock Salary Data Now →
      </ButtonStyled>
      <div
        onClick={handleContributionStatus}
        style={{
          fontSize: ".8rem",
          fontWeight: "bold",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        I already added my salary →
      </div>

      {/* <ButtonStyled scrollToSection={true} bgColor="white">
        View Data
      </ButtonStyled> */}
    </HeroWrapper>
  );
}

export default HeroSection;
