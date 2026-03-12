import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

function AdminLayout({ children, user, onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        onLogout();
        navigate('/admin');
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
        { name: 'Manage Events', path: '/admin/manage-events', icon: '📅' },
        { name: 'Add Event', path: '/admin/add-event', icon: '➕' },
        { name: 'Gallery', path: '/admin/gallery', icon: '🖼️' },
    ];

    return (
        <div className="admin-layout">
            {/* Hamburger Menu for Mobile */}
            <button className="admin-hamburger" onClick={toggleSidebar}>
                {isSidebarOpen ? '✕' : '☰'}
            </button>

            {/* Overlay for Mobile Sidebar */}
            {isSidebarOpen && <div className="admin-sidebar-overlay" onClick={closeSidebar}></div>}

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div style={{ marginBottom: '40px', padding: '0 8px' }}>
                    <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: '800', letterSpacing: '-0.025em', color: 'white' }}>AdminHub</h2>
                    <p style={{ fontSize: '0.75rem', opacity: 0.5, margin: '4px 0 0 0' }}>College Events Portal</p>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column' }}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={closeSidebar}
                            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
                        >
                            <span className="admin-nav-icon">{item.icon}</span>
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="admin-sidebar-footer">
                    <div className="admin-user-profile">
                        <div className="admin-avatar">
                            {user ? user.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div className="admin-user-info">
                            <div className="admin-user-name">Administrator</div>
                            <div className="admin-user-email">{user}</div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="admin-logout-btn"
                    >
                        <span>Logout</span>
                        <span style={{ fontSize: '0.9rem' }}>🚪</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="admin-main-content">
                <header className="admin-header">
                    <h1 className="admin-header-title">
                        {navItems.find(item => location.pathname === item.path)?.name || 'Admin Panel'}
                    </h1>
                    <div className="admin-header-date">
                        { (new Date()).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) }
                    </div>
                </header>

                <div className="admin-content-inner">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default AdminLayout;
