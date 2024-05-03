import React from "react";
import { styled } from "@mui/system";

const FooterWrapper = styled("footer")({
  backgroundColor: "black",
  color: "white",
  textAlign: "center",
  padding: "10px 0",
  width: "100%",
  fontSize: "14px",
});

const Footer = () => {
  return (
    <FooterWrapper>©2024 ClearWage.co - All Rights Reserved</FooterWrapper>
  );
};

export default Footer;
