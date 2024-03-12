import React from 'react';
import Alert from 'react-bootstrap/Alert';

function CustomAlert({ variant, message, onClose }) {
  return (
    <Alert variant={variant} onClose={onClose} dismissible style={{ position: 'fixed', zIndex: 9999, top: '20px', left: '50%', transform: 'translateX(-50%)', width: '50%' , opacity : '0.7'}}>
      <Alert.Heading>{message}</Alert.Heading>
    </Alert>
  );
}

export default CustomAlert;
