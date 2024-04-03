import React from 'react';
import { styled, useTheme, useMediaQuery } from '@mui/material';
import ButtonStyled from './ButtonWrapper ';

const HeroWrapper = styled('div')(({theme})=>(  {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  color: 'white',
  width:'95%',


}));

export const Title = styled('h1')(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '2rem' : '2.2rem',
  marginBottom: '20px',
}));

export const Subtitle = styled('p')({
  fontSize: '.8rem',
  marginBottom: '30px',
});

function HeroSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <HeroWrapper>
      <Title>Salary Transparency For Attorneys</Title>
      <div className="flex-center">
      <Subtitle style={{maxWidth:isMobile?'100%':'70%'}}>The #1 question on every attorney’s mind when looking at a new firm is always about Salary. That information has always been private. Until now.</Subtitle>

      </div>
      <ButtonStyled openModal={true}>Contribute</ButtonStyled>
      <ButtonStyled scrollToSection={true}>View Data</ButtonStyled>
      
    </HeroWrapper>
  );
}

export default HeroSection;
