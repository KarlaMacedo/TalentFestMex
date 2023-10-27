import Header from "./Header";
import Footer from "./Footer";
import { Box, Typography, Link, Button, Grid, Container } from '@mui/material';
import { FullPageChat } from "flowise-embed-react";

export const Help = () => {
  return (
    <div style={{ height: '100vh', }}>
      <Box boxShadow={4}>
        <Header style={{ boxShadow: "4px" }} />
      </Box>
      <Container maxWidth="lg"
        style={{
          backgroundColor: 'white',
          padding: '20px 20px 58px 20px',
          marginTop: '10px'
        }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3" >Soporte, Quejas y Sugerencias</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Utiliza nuestro chatbot de ayuda para mejorar tu experiencia en cualquier duda que tengas sobre tus beneficios como empleado Santander.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="lg"
              align="left"
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '20px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              }}>
              <FullPageChat
                chatflowid="e331fee8-4bc3-4d30-bb56-e0229178bec7"
                apiHost="https://santander-tf.onrender.com"
                theme={{
                  chatWindow: {
                    welcomeMessage: "Hola! Qué quieres saber sobre los beneficios que tienes como empleado Santander?",
                    backgroundColor: "#ffffff",
                    height: "-webkit-fill-available",
                    width: "-webkit-fill-available",
                    fontSize: 16,
                    poweredByTextColor: "#303235",
                    botMessage: {
                      backgroundColor: "#f7f8ff",
                      textColor: "#303235",
                      showAvatar: true,
                      avatarSrc: "https://assets.stickpng.com/images/5a27cdfd52b1cc0d022e6d5c.png",
                    },
                    userMessage: {
                      backgroundColor: "#f2f2f2",
                      textColor: "black",
                      showAvatar: true,
                      avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
                    },
                    textInput: {
                      placeholder: "Escribe tus preguntas",
                      backgroundColor: "#ffffff",
                      textColor: "#303235",
                      sendButtonColor: "red",
                    }
                  }
                }}
              />
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Link variant="body1" href="" >
              Quejas, Sugerencias y Felicitaciones
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" align="center" style={{ backgroundColor: "red" }}>
              Contáctanos
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  )
}

export default Help;
