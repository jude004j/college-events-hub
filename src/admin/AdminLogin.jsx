import React, { useState } from 'react';
import API_BASE_URL from '../config/api';

function AdminLogin({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success: store token and notify App
                localStorage.setItem('adminToken', data.token);
                onLogin(data);
            } else {
                // Failure: display error from backend
                setError(data.message || 'Login failed. Please check credentials.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Could not connect to authentication server.');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f1f5f9',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '400px',
                width: '100%',
                background: 'white',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '10px' }}>Admin Login</h2>
                    <p style={{ color: '#64748b' }}>College Events Hub Management</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label htmlFor="email" style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '600' }}>Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="admin@college.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                fontSize: '1rem',
                                outlineColor: '#2563eb'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label htmlFor="password" style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '600' }}>Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                fontSize: '1rem',
                                outlineColor: '#2563eb'
                            }}
                        />
                    </div>

                    {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: 0 }}>{error}</p>}

                    <button
                        type="submit"
                        className="header-hover"
                        style={{
                            padding: '14px',
                            borderRadius: '8px',
                            background: '#1e293b',
                            color: 'white',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        Sign In
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <a href="/" style={{ fontSize: '0.875rem', color: '#64748b', textDecoration: 'none' }}>Return to public site</a>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
