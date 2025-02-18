import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { Subtitle, Title } from "../HeroSection";
import { useTheme, useMediaQuery, Button } from "@mui/material";
import ButtonStyled from "../ButtonWrapper ";

const MiuiSection = styled(Box)({
  background: "#004225",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  padding: "50px 0",
});

function Form() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleContributionStatus = () => {
    localStorage.setItem("hasContributed", "true");
  };

  return (
    <MiuiSection>
      <Box
        sx={{
          maxWidth: isMobile ? "95%" : "70%",
        }}
      >
        <Title> See How Your Salary Stacks Up Against Other Attorneys</Title>
        <div className="flex-center">
          <Subtitle style={{ maxWidth: "650px" }}>
            [1000+] attorneys have shared their salaries to create the most
            powerful attorney salary database. But there's a catch—you need to
            contribute to see the data. <br /> <br /> It only takes seconds.
            Your contribution is 100% anonymous. No names, no tracking—just the
            raw numbers that help everyone. And the knowledge you gain could
            mean thousands more in your next paycheck. <br /> <br /> Don't be
            left in the dark—Enter your salary now and unlock instant access.
          </Subtitle>
        </div>
      </Box>
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
    </MiuiSection>
  );
}

export default Form;
