import { Container, Typography, Divider, Grid } from '@mui/material';

function VacationInfoTable() {
    return (
        <Container>
            <Typography variant="h1" align="center" style={{ fontSize: "5vh" }}>23</Typography>
            <Typography variant="h2" align="center" style={{ fontSize: "3.4vh", marginBottom: "20px" }}>Días Disponibles</Typography>
            <Divider style={{ margin: '20px 0' }} />

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography variant="body1" style={{ fontSize: "2.3vh" }}>Saldo de arrastre de vacaciones:</Typography>
                </Grid>
                <Grid item xs={4} align="center">
                    <Typography variant="body1" style={{ fontSize: "2.3vh" }}>8</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="body1" style={{ fontSize: "2.3vh" }}>Días de vacaciones del año actual:</Typography>
                </Grid>
                <Grid item xs={4} align="center">
                    <Typography variant="body1" style={{ fontSize: "2.3vh" }}>15</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="body1" style={{ fontSize: "2.3vh" }}>Saldo total de vacaciones:</Typography>
                </Grid>
                <Grid item xs={4} align="center">
                    <Typography variant="body1" style={{ fontSize: "2.3vh" }}>23</Typography>
                </Grid>
            </Grid>

            <Divider style={{ margin: '20px 0' }} />

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography variant="body1" style={{ fontSize: "2.3vh" }}>Ausencias utilizadas:</Typography>
                </Grid>
                <Grid item xs={4} align="center">
                    <Typography variant="body1" style={{ fontSize: "2.3vh" }}>1</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="body1" style={{ fontSize: "2.3vh" }}>Saldo de ausencias disponibles:</Typography>
                </Grid>
                <Grid item xs={4} align="center">
                    <Typography variant="body1" style={{ fontSize: "2.3vh" }}>1</Typography>
                </Grid>
            </Grid>

            <Divider style={{ margin: '20px 0' }} />

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography variant="body1" style={{ fontSize: "2.3vh" }}>Días de permisos especiales utilizados:</Typography>
                </Grid>
                <Grid item xs={4} align="center">
                    <Typography variant="body1" style={{ fontSize: "2.3vh" }}>3</Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default VacationInfoTable;
