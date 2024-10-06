import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 Hyeokmin's Footer | All rights reserved.</p>
    </footer>
  );
};

const footerStyle = {
  bottom: 0,
  width: '100%',
  backgroundColor: '#333',
  color: 'white',
  textAlign: 'center',
  padding: '10px',
  height: '50px',
};

export default Footer;
