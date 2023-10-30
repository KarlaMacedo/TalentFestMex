import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Container,
  IconButton,
  Grid,
  Typography,
  DialogActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/system';
import VacationInfoTable from "./Table"
import Calendar from "./Calendar"
import TimeOffForm from "./Form"
import Header from "../Header"
import Footer from "../Footer"
import vacationsTable from '/public/assets/Imgs/vacationsTable.png'


export const Timeoff = () => {
  const theme = useTheme();

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleOpenCalendar = () => {
    setOpenCalendar(true);
  };

  const handleCloseCalendar = () => {
    setOpenCalendar(false);
  };

  const openImageModal = () => {
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: "20px",
        }}
      >
        <Container maxWidth="lg"
          style={{
            backgroundColor: 'white',
            padding: '20px',
            color: theme.palette.txtPrincipal.main,
            borderRadius: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            margin: "5px 20px 50px 20px",
          }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <VacationInfoTable />
            </Grid>
            <Grid item xs={12}>
              <Typography onClick={openImageModal} style={{ color: "blue", cursor: "pointer", textDecoration: "underline", marginLeft: "25px" }}>Información sobre vacaciones</Typography>
            </Grid>
            <Grid item xs={5} align="center">
              <Button variant="contained" style={{ backgroundColor: "white", color: "red" }} onClick={handleOpenCalendar}>
                Calendario
              </Button>
            </Grid>
            <Grid item xs={7} align="center">
              <Button variant="contained" style={{ backgroundColor: "red", width: "144px" }} onClick={handleOpenForm}>
                Agendar Time Off
              </Button>
            </Grid>
            <Dialog open={isImageModalOpen} onClose={closeImageModal}>
              <DialogTitle>
                <IconButton
                  color="inherit"
                  onClick={closeImageModal}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <img src={vacationsTable} alt="Imagen información vacaciones" style={{ maxWidth: "-webkit-fill-available" }} />
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={closeImageModal} style={{ backgroundColor: "red" }}>
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog open={openCalendar} onClose={handleCloseCalendar}>
              <DialogTitle>
                <IconButton
                  color="inherit"
                  onClick={handleCloseCalendar}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Container maxWidth="lg">
                  <Calendar onCancel={handleCloseCalendar} />
                </Container>
              </DialogContent>
            </Dialog>
            <Dialog open={openForm} onClose={handleCloseForm} maxWidth="lg">
              <DialogTitle style={{ margin: "10px 0px 0px 10px", padding: "0px" }}>
                <IconButton
                  color="inherit"
                  onClick={handleCloseForm}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent style={{ margin: "0px", padding: "0px" }}>
                <Container maxWidth="lg" style={{ margin: "0px", padding: "0px" }}>
                  <TimeOffForm onCancel={handleCloseForm} />
                </Container>
              </DialogContent>
            </Dialog>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  )
}