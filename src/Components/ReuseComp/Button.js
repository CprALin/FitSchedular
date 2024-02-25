import React, { useState } from "react";

const buttonStyle = {
  button: {
    backgroundColor: '#F05941',
    border: 'none',
    color: '#FFF',
    padding: '10px 35px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 30px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: '0.3s'
  },
  buttonHovered: {
    backgroundColor: '#BE3144'
  }
};

function Button({ children, padding }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  return (
    <button
      style={{
        ...buttonStyle.button,
        padding: padding || '10px 35px',
        ...(isHovered && buttonStyle.buttonHovered)
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}

export default Button;
