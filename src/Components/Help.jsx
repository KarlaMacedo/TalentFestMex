import Header from "./Header";
import Footer from "./Footer";
import { Box, Typography, Link, Button, Grid, Container } from '@mui/material';
import { FullPageChat } from "flowise-embed-react";
import { useEffect, useRef, useState } from 'react';

export const Help = () => {
  const chatContainerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true); // Estado para controlar el scroll automático

  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    const scrollChatToBottom = () => {
      if (chatContainer && autoScroll) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    };

    // Establecer un temporizador para ajustar el scroll automáticamente si autoScroll es true
    const scrollTimer = setInterval(scrollChatToBottom, 1000);

    // Manejar el evento de scroll del usuario
    const handleScroll = () => {
      // Si el usuario ha realizado scroll hacia arriba, deshabilitar el scroll automático
      if (chatContainer.scrollTop + chatContainer.clientHeight < chatContainer.scrollHeight) {
        setAutoScroll(false);
      } else {
        setAutoScroll(true);
      }
    };

    chatContainer.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(scrollTimer);
      chatContainer.removeEventListener('scroll', handleScroll);
    };
  }, [autoScroll]);

  return (
    <div style={{ height: '100vh', }}>
      <Box boxShadow={4}>
        <Header style={{ boxShadow: "4px" }} />
      </Box>
      <Container maxWidth="lg"
        style={{
          backgroundColor: 'white',
          padding: '20px 20px 58px 20px',
          marginTop: '20px'
        }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3" >Soporte, Quejas y Sugerencias</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Utiliza nuestro chatbot de ayuda para cualquier duda que tengas sobre tus beneficios como empleado Santander.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="lg"
              ref={chatContainerRef}
              align="left"
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '20px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                overflowY: 'auto',
                maxHeight: '45vh'
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
                    fontSize: 14,
                    poweredByTextColor: "#303235",
                    botMessage: {
                      backgroundColor: "#f7f8ff",
                      textColor: "#303235",
                      showAvatar: true,
                      avatarSrc: "https://i.pinimg.com/564x/51/68/a8/5168a85631d2a0923374c252c2c5a0a8.jpg",
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
