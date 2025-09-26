// Fix: Replaced placeholder content with a valid React component.
import React from 'react';

const Header = () => {
  return (
    <header className="lcars-header">
      <div className="lcars-header-text">A.I. COMMAND INTERFACE</div>
      <div className="lcars-header-info">
        <span>STATUS: NOMINAL</span>
        <span>MISSION CLOCK: 42.0.1</span>
      </div>
    </header>
  );
};

export default Header;
