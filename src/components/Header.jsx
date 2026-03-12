import React from 'react';

function Header({ onGoHome, headerData }) {
    if (!headerData) return null;

    return (
        <div className="header-wrapper">
            <header className="header-container animate-fade-in">
                {/* Left Logo (College) */}
                <div 
                    className="header-logo-box" 
                    onClick={onGoHome} 
                    style={{ cursor: 'pointer' }}
                    title="Go to Home"
                >
                    <img src="/assets/college-logo.png" alt="College Logo" />
                </div>

                {/* Centered Title Text */}
                <div className="header-title-text">
                    <h1>{headerData.title}</h1>
                </div>

                {/* Right Logo (Department / Hub) */}
                <div 
                    className="header-logo-box" 
                    onClick={onGoHome} 
                    style={{ cursor: 'pointer' }}
                    title="Go to Home"
                >
                    <img src="/assets/dept-logo.png" alt="Department Logo" />
                </div>
            </header>
        </div>
    );
}

export default Header;


