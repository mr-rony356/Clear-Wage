import React, { useState } from "react";
import { styled } from "@mui/system";
import Modal from "./sections/MultiSteps"; // Import the Modal component
import LockOpenIcon from "@mui/icons-material/LockOpen"; // Import lock icon
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Import arrow icon

// Create a container for the button that will hold the border
const ButtonContainer = styled("div")(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  margin: "20px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    maxWidth: "340px",
  },
}));

// The actual button without a border
const ButtonWrapper = styled("button")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "600",
  color: "white",
  border: "none",
  borderRadius: "0.375rem",
  backgroundColor: "#473AFF",
  padding: "16px 48px",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    fontSize: "18px",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  transition: "background-color 0.3s, transform 0.2s",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  outline: "none",
  position: "relative",
  zIndex: 1,
  "&:hover": {
    backgroundColor: "#2a2ad1",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
  "&:hover + .button-border": {
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
}));

// The separate border element
const ButtonBorder = styled("div")({
  position: "absolute",
  top: -6,
  left: -6,
  right: -6,
  bottom: -6,
  borderRadius: "0.405rem",
  border: "1px solid #473AFF",
  pointerEvents: "none",
  transition: "border-color 0.3s",
  zIndex: 0,
});

function ButtonStyled({
  children,
  onClick,
  scrollToSection,
  openModal,
  bgColor,
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

  // Check if the button is for unlocking salary data
  const isUnlockButton = children === "Unlock Salary Data";

  return (
    <>
      <ButtonContainer>
        <ButtonWrapper onClick={handleButtonClick}>
          {isUnlockButton ? (
            <>
              <LockOpenIcon fontSize="small" />
              {children}
              <ArrowForwardIcon fontSize="small" />
            </>
          ) : (
            children
          )}
        </ButtonWrapper>
        <ButtonBorder className="button-border" />
      </ButtonContainer>
      {modalOpen && <Modal open={modalOpen} onClose={handleCloseModal} />}
    </>
  );
}

export default ButtonStyled;
