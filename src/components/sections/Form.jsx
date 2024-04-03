import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { Subtitle } from '../HeroSection';
import { useTheme,useMediaQuery, Button } from '@mui/material';
import ButtonStyled from '../ButtonWrapper ';

const MiuiSection = styled(Box)({
    background: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    padding:'50px 0'
});
export const Title = styled('h1')(({ theme }) => ({
    fontSize: theme.breakpoints.down('sm') ? '1.6rem' : '1.8rem',
      marginBottom: '20px',
}));


function Form() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
    return (
        <MiuiSection>
            <Box sx={{
                maxWidth:isMobile?'95%': '70%'
            }}>
                <Title> Please Contribute Your Information. It’s Anonymous.</Title>
                <div className='flex-center'>
                <Subtitle style={{maxWidth:isMobile?'100%':'60%'}} >Together, we can crowd-source the ultimate salary transparency resource for attorneys. But, this data source is only as good as you make it so, please contribute (your entry is anonymous) accurately. By clicking submit, you consent to having your information included anonymously in the database below.</Subtitle>

                </div>

            </Box>
            <ButtonStyled openModal={true}>Contribute</ButtonStyled>
        </MiuiSection>

    );
}

export default Form;
