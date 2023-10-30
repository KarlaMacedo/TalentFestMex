/* eslint-disable no-unused-vars */

import { createTheme, ThemeProvider, getContrastRatio } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Home from './Components/Home';
import Help from './Components/Help';
import { Timeoff } from "./Components/Timeoff/Timeoff";
import './App.css'

const redSantanderBase = '#ec0000';
const bgColorBase = '#f2f2f2';
const txtBase = '#000';
const txtSecondaryBase = '#787878';

const santanderTheme = createTheme({
  palette: {
    redSantander: {
      main: redSantanderBase,
      contrastText: getContrastRatio(redSantanderBase, '#fff') > 4.5 ? '#fff' : '#000',
    },
    bgColor: {
      main: bgColorBase,
      contrastText: getContrastRatio(bgColorBase, '#fff') > 4.5 ? '#fff' : '#000',
    },
    txtPrincipal: {
      main: txtBase,
    },
    txtSecondary: {
      main: txtSecondaryBase,
    },
  },
  typography: {
    h0: {
      fontFamily: "Santander Headline W05 Bold"
    },
    h1: {
      fontSize: 32,
      fontFamily: "Santander Headline W05 Bold"
    },
    h2: {
      fontSize: 28,
      fontFamily: "Santander Text W05 Regular"
    },
    h3: {
      fontSize: 20,
      fontFamily: "Santander Text W05 Regular"
    },
    h4: {
      fontSize: 20,
      fontFamily: "Santander Headline W05 Bold"
    },
    p2: {
      fontSize: 14,
      fontFamily: "Santander Text W05 Regular"
    },
    p3: {
      fontSize: 12,
      fontFamily: "Santander Text W05 Regular"
    },
    p4: {
      fontSize: 16,
      fontFamily: "Santander Text W05 Regular"
    },
    body1: {
      fontSize: 15,
      fontFamily: "Santander Text W05 Regular"
    },
    button: {
      fontFamily: "Santander Headline W05 Bold",
      textTransform: 'none',
      border: "1px solid red",
    },
    span:{
      fontFamily: "Santander Headline W05 Bold",
    }
  },
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={santanderTheme}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/timeoff" element={<Timeoff />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
