import React, { useState } from 'react';
import { styled } from '@mui/system';
import Modal from './sections/MultiSteps'; // Import the Modal component

const ButtonWrapper = styled('button')(({ theme, bgColor }) => ({
  fontSize: '20px',
  color: 'black',
  border: `2px solid ${bgColor}`,
  backgroundColor: bgColor, // Set background color based on prop
  padding: '5px 25px',
  cursor: 'pointer',
  margin: '20px',
  transition: 'background-color 0.3s, color 0.3s',
  [theme.breakpoints.down('sm')]: {
    padding: '15px 0px', // Adjust padding for mobile view
  },
  [theme.breakpoints.down('sm')]: {
    width: '90%', // Adjust padding for mobile view
  },
  '&:hover': {
    backgroundColor: 'black',
    color: bgColor, // Set color to match background color
  },
}));

function ButtonStyled({ children, onClick, scrollToSection, openModal, bgColor }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    if (openModal) {
      setModalOpen(true);
    } else if (scrollToSection) {
      const section = document.getElementById('last');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
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
      <ButtonWrapper onClick={handleButtonClick} bgColor={bgColor}>{children}</ButtonWrapper>
      {modalOpen && <Modal open={modalOpen} onClose={handleCloseModal} />} {/* Render the Modal component when modalOpen is true */}
    </>
  );
}

export default ButtonStyled;