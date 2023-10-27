import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography,tableCellClasses } from '@mui/material';

export default function CourseBalance () {
    
const courses = JSON.parse(localStorage.getItem('coursesData'));

function createData(topic, data) {
    return { topic, data };
  }
  
  const rows = [
    createData('Cursos Aprobados', (courses.approved + ' cursos de ' + courses.total) ),
    createData('Cursos en Proceso', (courses.in_process + ' cursos de ' + courses.total)),
    createData('Faltantes', ((courses.total - courses.approved) + ' cursos de ' + courses.total)),
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
        >Balance de Cursos</Typography> 

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
                    <TableCell align="left">{row.data}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
