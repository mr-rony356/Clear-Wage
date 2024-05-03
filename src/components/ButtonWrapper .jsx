import React, { useState } from "react";
import { styled } from "@mui/system";
import Modal from "./sections/MultiSteps"; // Import the Modal component

const ButtonWrapper = styled("button")(({ theme, bgColor, nav }) => ({
  fontSize: "20px",
  color: nav ? "gray" : "black",
  border: nav ? "none" : `2px solid ${bgColor}`,
  backgroundColor: nav ? "transparent" : bgColor, // Set background color based on prop
  padding: nav ? " 10px" : "10px 35px",
  cursor: "pointer",
  margin: nav ? "0px" : "20px",
  transition: "background-color 0.3s, color 0.3s",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: "10px 0px", // Adjust padding for mobile view
    // Adjust padding for mobile view
  },
  "&:hover": {
    backgroundColor: nav ? "transparent" : "black", // Set background color based on prop
    color: bgColor, // Set color to match background color
  },
}));

function ButtonStyled({
  children,
  onClick,
  scrollToSection,
  openModal,
  bgColor,
  nav,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    if (openModal) {
      setModalOpen(true);
    } else if (scrollToSection) {
      const section = document.getElementById("last");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else if (onClick) {
      onClick();
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ButtonWrapper onClick={handleButtonClick} bgColor={bgColor} nav={nav}>
        {children}
      </ButtonWrapper>
      {modalOpen && <Modal open={modalOpen} onClose={handleCloseModal} />}{" "}
      {/* Render the Modal component when modalOpen is true */}
    </>
  );
}

export default ButtonStyled;
