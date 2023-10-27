import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography,tableCellClasses } from '@mui/material';
//import { getCourseRecords } from '../../Services/authService';

// const getCoursesData = async () => {
//   const coursesData = await getCourseRecords()
//   .then((data) => {
//     console.log(data);
//     return data
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//   localStorage.setItem('coursesData', JSON.stringify(coursesData))
// };

const courses = JSON.parse(localStorage.getItem('coursesData'))
    // llamar courseRecors y hacer el set 
    // localStorage.setItem('courseData', JSON.stringify(data));
    

function createData(topic, data) {
    return { topic, data };
  }
  
  const rows = [
    createData('Cursos Aprobados', (courses.total + ' cursos de ' + courses.total) ),
    createData('Cursos en Proceso', (courses.in_process + ' cursos de ' + courses.total)),
    createData('Faltantes', ((courses.total - courses.in_process) + ' cursos de ' + courses.total)),
  ];

export default function CourseBalance () {
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
