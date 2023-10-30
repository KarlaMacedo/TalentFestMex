import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import logo from "../../public/assets/Imgs/logo.png"
import { Link } from 'react-router-dom';

function Header() {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const openMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Box boxShadow={0}>
      <AppBar position="static" style={{ backgroundColor: "white", padding: "15px" }}>
        <Toolbar>
          <img
            src={logo}
            alt="Logo de la empresa"
            style={{ maxWidth: '25vh' }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <IconButton
            color="inherit"
            edge="end"
            aria-label="menu"
            onClick={openMenu}
            sx={{ color: 'red' }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={closeMenu}
          >
            <MenuItem onClick={closeMenu}>
              <HomeIcon sx={{ marginRight: 1, color: "red" }} />
              <Link to="/home" style={{ color: "black", textDecoration: "none" }}>Home</Link>
            </MenuItem>
            <MenuItem onClick={closeMenu}>
              <AirplanemodeActiveIcon sx={{ marginRight: 1, color: "red" }} />
              <Link to="/timeoff" style={{ color: "black", textDecoration: "none" }}>Time Off</Link>
            </MenuItem>
            <MenuItem onClick={closeMenu}>
              <HelpOutlineIcon sx={{ marginRight: 1, color: "red" }} />
              <Link to="/help" style={{ color: "black", textDecoration: "none" }}>Ayuda</Link>
            </MenuItem>
            <MenuItem onClick={closeMenu}>
              <LogoutOutlinedIcon sx={{ marginRight: 1, color: "red" }} />
              <Link to="/" style={{ color: "black", textDecoration: "none" }} onClick={()=>localStorage.clear()}>Cerrar Sesión</Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
