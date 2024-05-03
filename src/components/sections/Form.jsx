import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { Subtitle, Title } from "../HeroSection";
import { useTheme, useMediaQuery, Button } from "@mui/material";
import ButtonStyled from "../ButtonWrapper ";

const MiuiSection = styled(Box)({
  background: "black",
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

  return (
    <MiuiSection>
      <Box
        sx={{
          maxWidth: isMobile ? "95%" : "70%",
        }}
      >
        <Title>
          {" "}
          Please Contribute Your Information. <br />
          It’s Anonymous.
        </Title>
        <div className="flex-center">
          <Subtitle style={{ maxWidth: "650px" }}>
            Together, we can crowdsource the ultimate salary transparency
            resource for attorneys. However, this data source is only as good as
            your contributions, so please ensure accuracy when submitting (your
            entry is anonymous). By clicking ‘submit,’ you consent to having
            your information included anonymously in the database below for
            others to see.
          </Subtitle>
        </div>
      </Box>
      <ButtonStyled openModal={true} bgColor="#b59658">
        Contribute Salary
      </ButtonStyled>
    </MiuiSection>
  );
}

export default Form;
