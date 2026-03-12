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
        <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{
                padding: '24px',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <h3 className="admin-card-title" style={{ margin: 0 }}>Total Events ({events.length})</h3>
                <NavLink
                    to="/admin/add-event"
                    className="admin-logout-btn"
                    style={{ textDecoration: 'none', background: 'var(--primary)', width: 'auto', padding: '10px 20px' }}
                >
                    <span>➕ Add New Event</span>
                </NavLink>
            </div>

            <div className="admin-table-container">
                {loading ? (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                        <div className="animate-pulse">Loading events...</div>
                    </div>
                ) : error ? (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#ef4444' }}>{error}</div>
                ) : events.length === 0 ? (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>No events found. Create one to get started!</div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#f8fafc' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Event Title</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hub Name</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Event Date</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '20px 24px' }}>
                                        <div style={{ fontWeight: '600', color: '#0f172a', marginBottom: '4px' }}>{event.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.description}</div>
                                    </td>
                                    <td style={{ padding: '20px 24px', fontSize: '0.875rem', color: '#475569' }}>{event.hubId?.name || 'N/A'}</td>
                                    <td style={{ padding: '20px 24px', fontSize: '0.875rem', color: '#475569' }}>{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                    <td style={{ padding: '20px 24px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                className="admin-logout-btn"
                                                style={{ background: '#f1f5f9', color: '#475569', padding: '6px 12px', fontSize: '0.8rem', width: 'auto' }}
                                                onClick={() => navigate(`/admin/edit-event/${event._id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="admin-logout-btn"
                                                style={{ padding: '6px 12px', fontSize: '0.8rem', width: 'auto' }}
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
