// Header.js
import React from 'react';
import './sideNav.css'
const Header = () => {
    return (
        <header style={headerStyle} className="header" >
            <h4>Wood Connect</h4>
        </header>
    );
};

// Styling for the Header
const headerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '8px 0px 4px',
    textAlign: 'center',
    position: 'sticky',
    top: '0',
    bottom: '0'
};



export default Header;
