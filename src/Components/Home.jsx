import { useNavigate } from "react-router-dom";
import Feedback from '../Components/Home/Feedback'
import Content from "../Components/Home/Content";
import { Button, Stack, Box, Typography, Grid } from '@mui/material';
import { getPersonalInfo, getLaborData } from "../Services/authService";

const date = new Date().toLocaleDateString('es-ES', { weekday:"long", year:"numeric", month:"long", day:"numeric"});
const firstLetter = date.charAt(0);
const rest = date.slice(1);
const dateToday = firstLetter.toUpperCase() + rest;
  
const name = getPersonalInfo().full_name.split(' ')[0];
const stack = getLaborData().job_title;

export default function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/timeoff");
    }

    const goLogin = () => {
        navigate("/");
    }

    return (
        <Box sx={{ maxWidth: '90%', m: 'auto' }}>
            
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={goLogin}>Login</Button>
                <Button variant="outlined" onClick={handleClick}>Time off</Button>
            </Stack>
            
            
            <Grid container columnSpacing={3} >
                <Grid item xs={12} md={5}>
                        <Box pb={3} pt={3}>
                            <Typography variant='h1'color='#ec0000'>¡Hola {name}!</Typography>
                            <Typography variant='p4'>{stack}</Typography>   
                        </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Typography pb={3} pt={3} align='right' >{`${dateToday}`}</Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Content />
                    <Content />
                </Grid>
                <Grid item xs={12} md={7}>
                    <Content />
                    <Feedback />
                </Grid>
            </Grid>
        </Box>
    );
}
