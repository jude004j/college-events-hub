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
                <div style={{ marginBottom: '40px', padding: '0 10px' }}>
                    <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '700' }}>Admin Hub</h2>
                    <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>College Events Portal</p>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={closeSidebar}
                            style={({ isActive }) => ({
                                padding: '12px 16px',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: 'white',
                                background: isActive ? '#334155' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontSize: '1rem',
                                transition: 'background 0.2s',
                            })}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div style={{ marginTop: 'auto', padding: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 0', borderTop: '1px solid #334155' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                            👤
                        </div>
                        <div style={{ fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <div style={{ fontWeight: '600' }}>Admin</div>
                            <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{user}</div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="admin-btn"
                        style={{
                            width: '100%',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            marginTop: '10px'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="admin-main-content">
                <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: 0 }}>
                        {navItems.find(item => location.pathname === item.path)?.name || 'Admin Panel'}
                    </h1>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '0.9rem', color: '#64748b' }}>
                        <span>{(new Date()).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </header>

                <section style={{ maxWidth: '1200px' }}>
                    {children}
                </section>
            </main>
        </div>
    );
}

export default AdminLayout;
