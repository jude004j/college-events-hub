import React, { useState, useEffect, useRef } from 'react';

function HubDetails({ hub }) {
    const [featuredActiveImageIndex, setFeaturedActiveImageIndex] = useState(0);
    const placeholderImage = "/assets/event-placeholder.jpeg";
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [hub]);

    if (!hub) return null;

    return (
        <div className="container" style={{ paddingTop: '40px' }}>
            {/* Sub Hub Title Section */}
            <header className="details-header animate-fade-in">
                <h1 className="details-title">{hub.hubName}</h1>
                <p className="details-subtitle">{hub.hubOverview}</p>
            </header>

            <div className="details-container">
                {/* Information Card */}
                <div
                    ref={el => sectionRefs.current[0] = el}
                    className="glass-card details-glass-card reveal-section"
                >
                    <h2 style={{ color: '#0f172a', textAlign: 'center', marginBottom: '20px', fontWeight: '700' }}>{hub.hubName} Hub</h2>
                    <p style={{ color: '#475569', lineHeight: '1.6', textAlign: 'center', marginBottom: '50px' }}>Part of our Innovation Hub – Information Technology. Join us to explore more.</p>

                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
                        <div style={{
                            width: '100%',
                            minHeight: 'clamp(250px, 40vh, 450px)',
                            backgroundColor: '#f8fafc',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#94a3b8',
                            border: '2px dashed #e2e8f0',
                            overflow: 'hidden',
                            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
                        }}>
                            {(hub.events && hub.events.length > 0 && (hub.events[0].images?.length > 0 || hub.events[0].image)) ? (
                                <img
                                    src={hub.events[0].images?.[featuredActiveImageIndex] || hub.events[0].image}
                                    alt="Featured Event"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = placeholderImage;
                                    }}
                                />
                            ) : (
                                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <img src={placeholderImage} alt="Placeholder" style={{ width: '80px', opacity: 0.2 }} />
                                    <span>No Featured Image</span>
                                </div>
                            )}
                        </div>

                        {/* Multi-image Thumbnails */}
                        {hub.events?.[0]?.images?.length > 1 && (
                            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                                {hub.events[0].images.slice(0, 5).map((imgUrl, idx) => (
                                    <img
                                        key={idx}
                                        src={imgUrl}
                                        alt={`Thumbnail ${idx + 1}`}
                                        style={{
                                            width: '60px',
                                            height: '45px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            border: featuredActiveImageIndex === idx ? '2px solid #2563eb' : '2px solid transparent',
                                            transition: 'border 0.2s ease-in-out',
                                            flexShrink: 0
                                        }}
                                        onClick={() => setFeaturedActiveImageIndex(idx)}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = placeholderImage;
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={{ backgroundColor: '#f1f5f9', padding: 'clamp(20px, 5vw, 40px)', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
                            <h4 style={{ margin: 0, fontSize: '1.4rem', color: '#1e293b', fontWeight: '600' }}>Hub Highlights</h4>
                            {hub.events && hub.events.length > 0 && hub.events[0].registerLink && (
                                <a
                                    href={hub.events[0].registerLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cta-button"
                                    style={{ 
                                        padding: '10px 25px', 
                                        backgroundColor: '#0f172a', 
                                        color: 'white', 
                                        borderRadius: '8px', 
                                        textDecoration: 'none', 
                                        fontWeight: '700' 
                                    }}
                                >
                                    Register Now
                                </a>
                            )}
                        </div>
                        <p style={{ margin: 0, color: '#334155', lineHeight: '1.8' }}>
                            {hub.hubOverview} Explore workshops, projects, and latest innovations in this hub.
                        </p>
                    </div>
                </div>

                {/* Upcoming Events Section */}
                <div
                    ref={el => sectionRefs.current[1] = el}
                    className="reveal-section"
                    style={{ marginTop: '20px' }}
                >
                    <h3 style={{ borderBottom: '2px solid rgba(255,255,255,0.2)', paddingBottom: '20px', color: 'white', margin: '0 0 40px 0', fontWeight: '700' }}>
                        Upcoming Events
                    </h3>
                    {hub.events && hub.events.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            {hub.events.map(event => (
                                <div
                                    key={event.eventId}
                                    className="glass-card hover-elevate event-box"
                                >
                                    {/* Event Image Box */}
                                    <div className="event-image-container">
                                        <img
                                            src={event.image || "/assets/event-placeholder.jpeg"}
                                            alt="Event"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/assets/event-placeholder.jpeg";
                                            }}
                                        />
                                    </div>

                                    <div className="event-content">
                                        <h4 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: '700', marginBottom: '8px' }}>{event.eventTitle}</h4>
                                        <p style={{ color: '#475569', marginBottom: '12px' }}>{event.eventDescription}</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>ID: {event.eventId}</span>
                                            {event.registerLink && (
                                                <a
                                                    href={event.registerLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}
                                                >
                                                    Register Now →
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div style={{ minWidth: '120px' }}>
                                        <span style={{
                                            color: '#1e293b',
                                            backgroundColor: '#f1f5f9',
                                            padding: '8px 20px',
                                            borderRadius: '8px',
                                            fontWeight: '700',
                                            display: 'block',
                                            textAlign: 'center'
                                        }}>
                                            {event.eventDate}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{
                            padding: '60px 20px',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: '24px',
                            border: '2px dashed rgba(255,255,255,0.2)',
                            textAlign: 'center',
                            color: 'white',
                        }}>
                            <p style={{ margin: 0, opacity: 0.8 }}>No upcoming events scheduled currently.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HubDetails;
