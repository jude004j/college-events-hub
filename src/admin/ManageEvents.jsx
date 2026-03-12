import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';

function ManageEvents() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/events`);
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            } else {
                setError('Failed to fetch events');
            }
        } catch (err) {
            setError('Could not connect to server');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        const token = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`${API_BASE_URL}/api/events/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setEvents(events.filter(e => e._id !== id));
            } else {
                alert('Failed to delete event');
            }
        } catch (err) {
            alert('Error deleting event');
        }
    };

    return (
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
            <div style={{
                padding: '20px 24px',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>Total Events ({events.length})</h3>
                <NavLink
                    to="/admin/add-event"
                    className="admin-btn admin-btn-primary"
                    style={{ textDecoration: 'none' }}
                >
                    <span>➕</span> Add New Event
                </NavLink>
            </div>

            <div className="admin-table-container">
                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading events...</div>
                ) : error ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>{error}</div>
                ) : events.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No events found. Create one to get started!</div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#f8fafc' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: '600', fontSize: '0.85rem' }}>EVENT TITLE</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: '600', fontSize: '0.85rem' }}>HUB NAME</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: '600', fontSize: '0.85rem' }}>EVENT DATE</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: '600', fontSize: '0.85rem' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#fcfcfc'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                                    <td style={{ padding: '20px 24px' }}>
                                        <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{event.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.description}</div>
                                    </td>
                                    <td style={{ padding: '20px 24px', fontSize: '0.95rem', color: '#475569' }}>{event.hubId?.name || 'N/A'}</td>
                                    <td style={{ padding: '20px 24px', fontSize: '0.95rem', color: '#475569' }}>{new Date(event.date).toLocaleDateString()}</td>
                                    <td style={{ padding: '20px 24px' }}>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            <button
                                                className="admin-btn admin-btn-secondary"
                                                onClick={() => navigate(`/admin/edit-event/${event._id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="admin-btn admin-btn-danger"
                                                onClick={() => handleDelete(event._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default ManageEvents;
