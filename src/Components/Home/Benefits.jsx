import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography,tableCellClasses } from '@mui/material';


function createData(topic) {
    return { topic };
  }
  
  const rows = [
    createData('Gastos de seguros médicos mayores' ),
    createData('Gastos de seguros dental' ),
    createData('GymPass' ),
    createData('Vales de Despensa' ),
  ];


export default function Benefits () {
    return (
        <TableContainer sx={{
            borderRadius: '10px',
            boxShadow: 4, mb: 3 }} 
            component={Paper} 
            >
            <Typography 
                variant="h4" 
                color="txtPrincipal" 
                align="left" 
                sx={{ pl: 2, pt: 3, pb: 1 }}
            >
                Beneficios
            </Typography> 
            <Table sx={{
                        [`& .${tableCellClasses.root}`]: {
                          borderBottom: "none",
                          fontFamily: "Santander Text W05 Regular",
                          fontSize: 16
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
                    <TableCell align="left">
                        <img src={`/public/assets/Imgs/Done.png`} alt='check'></img>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
