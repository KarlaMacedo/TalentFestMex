/* eslint-disable react/prop-types */
import { useState } from 'react';
import { IconButton, Container, Typography, TextField, MenuItem, Button, Grid, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import { useTheme } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import permitsTable from '../../Assets/Imgs/permitsTable.png'

function TimeOffForm({ onCancel }) {

  const timeOffData = JSON.parse(localStorage.getItem('timeOffData'));

  //console.log(timeOffData.holidays.success);
  //console.log(timeOffData);

  const theme = useTheme();

  const [reason, setReason] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [description, setDescription] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [showWarning2, setShowWarning2] = useState(false);
  const [showWarning3, setShowWarning3] = useState(false);
  const [showWarning4, setShowWarning4] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setShowWarning2(false);
    setShowWarning3(false);
    setShowWarning4(false);

    const selectedDate = new Date(event.target.value);
    const toSelectDate = new Date(toDate);
    if (selectedDate !== toSelectDate) {
      if (toSelectDate && selectedDate > toSelectDate) {
        setShowWarning4(true);
      } else {
        setShowWarning2(false);
        setShowWarning3(false);
        setFromDate(event.target.value);
      }
    } else {
      setFromDate(event.target.value);
    }
  };

  const handleToDateChange = (event) => {
    setShowWarning2(false);
    setShowWarning3(false);
    setShowWarning4(false);

    const selectedDate = new Date(event.target.value);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 2);
    const fromSelectDate = new Date(fromDate);

    if (selectedDate !== fromSelectDate) {
      if (fromSelectDate && selectedDate < fromSelectDate) {
        setShowWarning3(true);
      } else if (selectedDate < yesterday) {
        setShowWarning2(true);
      } else {
        setShowWarning2(false);
        setShowWarning3(false);
        setToDate(event.target.value);
      }
    } else {
      setFromDate(event.target.value);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const openImageModal = () => {
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };


  const handleCancel = () => {
    console.log('Cancel');
    onCancel();
  };

  function calculateDurationInDays(period) {
    if (period.length !== 2) {
      console.error("The period must contain exactly two dates.");
    }
  
    const startDate = new Date(period[0]);
    const endDate = new Date(period[1]);
  
    if (isNaN(startDate) || isNaN(endDate)) {
      console.error("Provided dates are not valid.");
    }
  
    const timeDifferenceInMilliseconds = endDate - startDate;
    const durationInDays = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
  
    return durationInDays;
  }

  const handleSubmit = () => {
    if (reason && fromDate && toDate && description) {
      if (reason === "vacations"){
        console.log([fromDate,toDate], "vacaciones");
        console.log(calculateDurationInDays([fromDate,toDate]));
      } else if (reason === "personal"){
        console.log([fromDate,toDate], "ausencia");
      } else {
        console.log([fromDate,toDate], "permiso especial");
      }
      // console.log('Motivo:', reason);
      // console.log('Desde:', fromDate);
      // console.log('Hasta:', toDate);
      // console.log('Descripción:', description);
      // Agregar lógica para envío de form

      console.log({
        "id": timeOffData.id,
        "holidays": {
          "pending": [...timeOffData.holidays.pending],
          "success": [...timeOffData.holidays.success],
          "prev_year_days": timeOffData.holidays.prev_year_days,
          "current_year_days": timeOffData.holidays.current_year_days,
          "used_days": timeOffData.holidays.used_days,
          "total_days": timeOffData.holidays.total_days,
          "rejected": [...timeOffData.holidays.rejected]
        },
        "absences": {
          "dates": [...timeOffData.absences.dates],
          "total_days": timeOffData.absences.total_days,
          "used_days": timeOffData.absences.used_days
        },
        "permissions": {
          "special_days": [...timeOffData.permissions.special_days],
          "total_days": timeOffData.permissions.total_days
        }
      });
      onCancel();
    } else {
      setShowWarning(true);
    }
  };

  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <Container maxWidth="lg"
      style={{
        backgroundColor: 'white',
        padding: '0px 20px 20px 20px',
        color: theme.palette.txtPrincipal.main,
      }}>
      <Typography variant="h1" align="center" style={{ fontSize: "3.5vh", marginBottom: "30px" }}>¡ Solicita tu Time Off !</Typography>
      {showWarning && (
        <Typography variant="body1" align="center" color="error" style={{ fontSize: "2.2vh", marginBottom: "25px" }}>
          Completa todos los campos requeridos.
        </Typography>
      )}
      {showWarning2 && (
        <Typography variant="body1" align="center" color="error" style={{ fontSize: "2.2vh", marginBottom: "25px" }}>
          Selecciona una fecha posterior al día de hoy.
        </Typography>
      )}
      {showWarning3 && (
        <Typography variant="body1" align="center" color="error" style={{ fontSize: "2.2vh", marginBottom: "25px" }}>
          Selecciona una fecha posterior al día de inicio.
        </Typography>
      )}
      {showWarning4 && (
        <Typography variant="body1" align="center" color="error" style={{ fontSize: "2.2vh", marginBottom: "25px" }}>
          Selecciona una fecha anterior al día de finalización.
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="¿Cuál es tu motivo?"
              variant="outlined"
              select
              value={reason}
              onChange={handleReasonChange}
              style={{
                backgroundColor: theme.palette.bgColor.main,
              }}
            >
              <MenuItem value="vacations">Vacaciones</MenuItem>
              <MenuItem value="disabilityIllness">Incapacidad por enfermedad</MenuItem>
              <MenuItem value="disabilityMat">Incapacidad por maternidad</MenuItem>
              <MenuItem value="maternityBiol">Maternidad biológica</MenuItem>
              <MenuItem value="maternityAdop">Maternidad adoptiva</MenuItem>
              <MenuItem value="paternity">Paternidad</MenuItem>
              <MenuItem value="maternalDead">Fallecimiento materno</MenuItem>
              <MenuItem value="maternityAdd">Adicional por maternidad</MenuItem>
              <MenuItem value="dayCare">Guardería</MenuItem>
              <MenuItem value="personal">Asuntos personales (ausencias)</MenuItem>
              <MenuItem value="familyIntervention">Intervención conyuge, hijos o padres</MenuItem>
              <MenuItem value="familyDead">Fallecimiento familiar directo</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3" align="left" style={{ marginBottom: "10px" }}>Desde</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="date"
              value={fromDate}
              onChange={handleFromDateChange}
              inputProps={{
                min: getFormattedDate(new Date()),
              }}
              style={{
                backgroundColor: theme.palette.bgColor.main,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3" align="left" style={{ marginBottom: "10px" }}>Hasta</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="date"
              value={toDate}
              onChange={handleToDateChange}
              inputProps={{ min: fromDate }}
              style={{
                backgroundColor: theme.palette.bgColor.main,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography onClick={openImageModal} style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}>Información sobre permisos especiales</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              style={{
                backgroundColor: theme.palette.bgColor.main,
              }}
            />
          </Grid>
          <Grid item xs={6} align="center">
            <Button variant="contained" onClick={handleCancel} style={{ backgroundColor: "white", color: "red" }}>
              Cancelar
            </Button>
          </Grid>
          <Grid item xs={6} align="center">
            <Button variant="contained" onClick={handleSubmit} style={{ backgroundColor: "red" }}>
              Solicitar
            </Button>
          </Grid>
        </Grid>
      </form>
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
          <img src={permitsTable} alt="Imagen información permisos especiales" style={{ maxWidth: "-webkit-fill-available" }} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={closeImageModal} style={{ backgroundColor: "red" }}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TimeOffForm;


