import * as React from 'react';
import { Box, Typography, Avatar, ListItemAvatar, ListItemText, Divider, ListItem, List } from '@mui/material';

function createData(name, feedback) {
    return { name, feedback };
  }
  
  const rows = [
    createData('Reyna Ramírez', 'Tengo en mis manos los resultados del mes de nuestra área de servicio y quiero felicitarte porque lograste un hito importante para el área y la empresa. Eres un ejemplo para el equipo, continúa con esa labor y recuerda que no hay límites para destacar.'),
    createData('Alex González', 'Tienes una actitud excelente. Cuando te veo llegar a la empresa vienes con un ánimo que en verdad motiva y contagia. Te felicito.'),
    createData('Sandra Adams', 'Estamos muy contentos con tu trabajo. Tus reportes y análisis sobre las incidencias nos ayudan mucho a ahorrar costos en la compañía. Muchas gracias. Solamente te recomiendo que tengas más contacto con los operadores. He notado que no te acercas mucho a ellos y quizá sus experiencias te podrían aportar información importante. ¿Qué te parece implementar un canal de comunicación con ellos? Piénsalo y si lo crees conveniente la empresa te apoyará.'),
  ];

export default function Feedback() {
  return (
    <Box sx={{ borderRadius: '10px',boxShadow: 4 }}>
        <List sx={{ width: '100%' }} >
                    <Typography variant="h4" color="txtPrincipal" align="left" sx={{ pl: 2, pt: 2, pb: 1 }}>Feedback</Typography> 
        {rows.map((row) => (
            <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt={row.name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                primary={row.name}
                secondary={
                    <Typography
                        sx={{ display: 'inline' }}
                        variant="p3"
                    >{row.feedback}
                    </Typography>
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            </>
            
       ) ) }
        
        </List>
    </Box>
  );
}
