import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography,tableCellClasses } from '@mui/material';
//import { getPersonalInfo, getLaborData } from '../../Services/authService';

// const personalInfo= JSON.parse(localStorage.getItem('userData'));
// const laboralData = JSON.parse(localStorage.getItem('laborData'));

// getPersonalInfo()

//getLaborData()




export default function Content () {
    
const personalInfo= JSON.parse(localStorage.getItem('userData'));
const laboralData= JSON.parse(localStorage.getItem('laborData'));

function createData(topic, data) {
    return { topic, data };
  }
  
  const rows = [
    createData('Nombre', personalInfo.full_name),
    createData('ID de empleado', '0194877672'),
    createData('Email', personalInfo.email),
    createData('Cumpleaños', personalInfo.birthday),
    createData('Posición', laboralData.job_title),
    createData('Nivel de Gestión', laboralData.department),
    createData('Tiempo en posición', '1 año, 5 meses, 5 días'),
    createData('Tipo de jornada', laboralData.work_shift),
  ];
    return (
        <TableContainer sx={{
            borderRadius: '10px',
            boxShadow: 4, mb: 3 }} component={Paper} >

        <Typography 
            variant="h4" 
            color="txtPrincipal" 
            align="left" 
            sx={{ pl: 2, pt: 3, pb: 1 }}
        >Datos Personales</Typography> 

            <Table sx={{
                        [`& .${tableCellClasses.root}`]: {
                          borderBottom: "none",
                          fontFamily: "Santander Text W05 Regular",
                          fontSize: 16, 
                        //   paddingRight: 0
                        }
                      }} aria-label="simple table">
                <TableBody  >
                {rows.map((row) => (
                    <TableRow
                    key={row.topic}
                    sx={{ }}
                    >
                    <TableCell component="th" scope="row">
                        {row.topic}
                    </TableCell>
                    <TableCell align="left">{row.data}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
