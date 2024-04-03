import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const MiuiSection = styled(Box)({
    background: 'linear-gradient(rgb(37 37 37 / 90%), rgb(10 14 19 / 64%)), url(/bg.jpg) 50% no-repeat',
    backgroundSize: 'cover',
    minHeight:'100vh',
    position:'relative'
});

function MainSection({ children }) {
  return <MiuiSection>{children}</MiuiSection>;
}

export default MainSection;
