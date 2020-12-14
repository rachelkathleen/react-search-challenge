import React from 'react';
import '../styles/MinimalButton.scss';

function MinimalButton({ children, onClick, ...props }) {
  return (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  );
}

export default MinimalButton;
