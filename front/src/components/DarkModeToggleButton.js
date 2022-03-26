import React, { useContext } from 'react';
import { DarkModeContext } from '../App';

function DarkModeToggleButton() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '24px',
      }}
    >
      <button onClick={toggleDarkMode} style={{ fontSize: '3em' }}>
        {isDarkMode ? '🌕' : '🌞'}
      </button>
    </div>
  );
}

export default DarkModeToggleButton;
