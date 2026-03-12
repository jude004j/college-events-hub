import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function AdminDashboard() {
    const [events, setEvents] = useState([]);
    const [hubsCount, setHubsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [eventsRes, hubsRes] = await Promise.all([
                fetch('http://localhost:5000/api/events'),
                fetch('http://localhost:5000/api/hubs')
            ]);

            if (eventsRes.ok && hubsRes.ok) {
                const eventsData = await eventsRes.json();
                const hubsData = await hubsRes.json();
                setEvents(eventsData);
                setHubsCount(hubsData.length);
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const stats = [
        { label: 'Total Hubs', value: hubsCount.toString(), icon: '🏢', color: '#3b82f6', bg: '#eff6ff' },
        { label: 'Total Events', value: events.length.toString(), icon: '📅', color: '#10b981', bg: '#ecfdf5' },
        { label: 'Total Admins', value: '3', icon: '👤', color: '#6366f1', bg: '#eef2ff' },
        { label: 'Recent Views', value: '1,284', icon: '📈', color: '#f59e0b', bg: '#fffbeb' },
    ];

    const recentEvents = events.slice(0, 4);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Stats Cards */}
            <div className="admin-stats-grid">
                {stats.map((stat, idx) => (
                    <div key={idx} style={{
                        padding: '24px',
                        background: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px'
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '12px',
                            background: stat.bg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            color: stat.color
                        }}>
                            {stat.icon}
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>{stat.label}</p>
                            <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#0f172a', fontWeight: '700' }}>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Table */}
            <div className="admin-table-container">
                <div style={{
                    padding: '20px 24px',
                    borderBottom: '1px solid #f1f5f9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>Recently Added Events</h3>
                    <NavLink to="/admin/manage-events" style={{ fontSize: '0.9rem', color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>View All</NavLink>
                </div>
                <div>
                    {loading ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading...</div>
                    ) : recentEvents.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No recent events.</div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: '#f8fafc' }}>
                                <tr>
                                    <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: '600', fontSize: '0.85rem' }}>ID</th>
                                    <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: '600', fontSize: '0.85rem' }}>EVENT TITLE</th>
                                    <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: '600', fontSize: '0.85rem' }}>HUB NAME</th>
                                    <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: '600', fontSize: '0.85rem' }}>EVENT DATE</th>
                                    <th style={{ padding: '16px 24px', color: '#64748b', fontWeight: '600', fontSize: '0.85rem' }}>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentEvents.map((event) => (
                                    <tr key={event._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px 24px', fontSize: '0.95rem', color: '#64748b' }}>#{event._id.substring(event._id.length - 6)}</td>
                                        <td style={{ padding: '16px 24px', fontSize: '0.95rem', color: '#1e293b', fontWeight: '600' }}>{event.title}</td>
                                        <td style={{ padding: '16px 24px', fontSize: '0.95rem', color: '#475569' }}>{event.hubId?.name || 'N/A'}</td>
                                        <td style={{ padding: '16px 24px', fontSize: '0.95rem', color: '#475569' }}>{new Date(event.date).toLocaleDateString()}</td>
                                        <td style={{ padding: '16px 24px', fontSize: '0.95rem' }}>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '50px',
                                                background: event.status === 'published' ? '#ecfdf5' : '#fff7ed',
                                                color: event.status === 'published' ? '#059669' : '#c2410c',
                                                fontSize: '0.75rem',
                                                fontWeight: '700',
                                                textTransform: 'capitalize'
                                            }}>
                                                {event.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
