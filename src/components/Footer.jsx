import React from "react";
import { styled } from "@mui/system";
import { Link } from "@mui/material";

const FooterWrapper = styled("footer")({
  backgroundColor: "black",
  color: "white",
  textAlign: "center",
  padding: "10px 0",
  width: "100%",
  fontSize: "14px",
});

const StyledLink = styled(Link)({
  color: "white",
  textDecoration: "underline",
  "&:hover": {
    color: "#b59658",
  },
});

const Footer = () => {
  return (
    <FooterWrapper>
      ClearWage is brought to you by{" "}
      <StyledLink
        href="https://holtzandbernard.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Holtz & Bernard LLC
      </StyledLink>
      , an attorney placement agency in Miami, FL that matches attorneys with
      esteemed boutiques and AmLaw firms.{" "}
      <StyledLink
        href="https://share.hsforms.com/1Rx2UZr0VQK6j7tZ_wOo8Dw3kr97"
        target="_blank"
        rel="noopener noreferrer"
      >
        Have someone reach out to discuss opportunities
      </StyledLink>
      <br /> <br />
      <StyledLink
        href="/privacy-policy"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </StyledLink>{" "}
      <br /> <br />
      ©2025 ClearWage.co - All Rights Reserved
    </FooterWrapper>
  );
};

export default Footer;
