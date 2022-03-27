import React, { useContext } from 'react';
import { DarkModeContext } from '../App';
import "../theme.css"

function DarkModeToggleButton() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div
      style={{
        border : "0px",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent:'flex-end',
        padding: '24px',
      }}
    >
      <button
        onClick={toggleDarkMode}
        style={{ fontSize: '3em', border: '0px' }}
        className={isDarkMode?"darkmodeLogo":"lightmodeLogo"}
      />
    </div>
  );
}

export default DarkModeToggleButton;
