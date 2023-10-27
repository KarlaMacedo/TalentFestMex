import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography,tableCellClasses } from '@mui/material';


function createData(topic, data) {
    return { topic, data };
  }
  
  const rows = [
    createData('Tu solicitud de permiso ha sido aceptada', '5 horas' ),
    createData('Felicita a Karla por su cumpleaños', '8 horas' ),
    createData('Tienes 2 cursos en proceso', '9 horas' ),
    createData('Tú evaluación a sido recibida', '12 horas' ),
  ];


export default function Notifications() {
    return (
        <TableContainer sx={{
            borderRadius: '10px',
            boxShadow: 4, mb: 3 }} component={Paper} >

        <Typography 
            variant="h4" 
            color="txtPrincipal" 
            align="left" 
            sx={{ pl: 2, pt: 3, pb: 1 }}
        >Notificaciones</Typography> 

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
                    <TableCell  sx={{opacity:'50%'}} >{row.data}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
