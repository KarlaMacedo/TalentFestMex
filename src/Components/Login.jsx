import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Grid,Link, Paper, Box, Modal, CircularProgress } from '@mui/material';
import { getPersonalInfo, handleLogin, getLaborData, getCourseRecords, getTimeOff, getSalaryCompensation } from '../Services/authService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'transparent',
  p: 4,
  color: 'white'
};

function Repository() {
  return (
    <Box variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
      <Typography >
        {'TalentFest Latam 2023 - Squad Santander '}
      </Typography>
      <Link variant="body2" color="text.secondary" href="https://github.com/KarlaMacedo/TalentFestMex">
        Consulta el Repositorio
      </Link>
    </Box>
  );
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    if (handleSubmit) {
      setLoading(true)
      await handleLogin(data.get("email"), data.get("password"))
      try {

        const data = await getPersonalInfo();
        localStorage.setItem('userData', JSON.stringify(data))

        const laborData = await getLaborData();
        localStorage.setItem('laborData', JSON.stringify(laborData))

        const coursesData = await getCourseRecords();
        localStorage.setItem('coursesData', JSON.stringify(coursesData))

        const salaryData = await getSalaryCompensation();
        localStorage.setItem('salaryData', JSON.stringify(salaryData))

        const timeOffData = await getTimeOff();
        localStorage.setItem('timeOffData', JSON.stringify(timeOffData))

        setLoading(false);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Datos incorrectos');
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Modal open={loading}>
            <Box sx={style}>              
              <CircularProgress color='redSantander' />
            </Box>
          </Modal>
          <img src="src/assets/Imgs/logo-login.png" alt="logo" style={{ width: '80%' }} />
          <Typography component="h1" variant="h0" sx={{ mt: 10 }}>
            ¡Hola de nuevo!
          </Typography>
          <Typography component="h2" variant="h2">
            Entra ahora
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} fontFamily={"Santander Text W05 Regular"}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color='redSantander'
              type='email'
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color='redSantander'
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='redSantander'
              sx={{ mt: 3, mb: 15 }}
            >
              Login
            </Button>
            <Repository />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1617563844154-4206853f7865?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );
}
