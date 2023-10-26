import { styled } from '@mui/system';

const FooterContainer = styled('div')({
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '0px',
  position: 'fixed',
  bottom: '0',
  width: '100%',
  fontSize: '10px',
});

function Footer() {
  return (
    <FooterContainer>
      <p>
        Created by Karla Macedo, Ilse Cervantes, Samantha Cruz, and Gabriela Gómez &copy; {2023}
      </p>
    </FooterContainer>
  );
}

export default Footer;
