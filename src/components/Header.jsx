import React from 'react';

function Header({ onGoHome, headerData }) {
    if (!headerData) return null;

    return (
        <div className="header-wrapper">
            <header className="animate-slide-down header-container">
                {/* Left Logo (College) */}
                <div
                    className="header-logo-left"
                    onClick={onGoHome}
                    title="Go to Home"
                >
                    <img
                        src="/assets/college-logo.png"
                        alt="College Logo"
                        className="header-logo"
                    />
                </div>

                {/* Centered Title Text */}
                <div className="header-title-wrapper">
                    <h1 className="header-title-text">
                        {headerData.title}
                    </h1>
                </div>

                {/* Right Logo (Department / Hub) */}
                <div
                    className="header-logo-right"
                    onClick={onGoHome}
                    title="Go to Home"
                >
                    <img
                        src="/assets/dept-logo.png"
                        alt="Department Logo"
                        className="header-logo"
                    />
                </div>
            </header>
        </div>
    );
}

export default Header;


