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
        <div className="container" style={{ padding: '0 20px' }}>
            {/* Sub Hub Title Section */}
            <header className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h1 style={{
                    color: 'white',
                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                    marginBottom: '15px',
                    fontWeight: '800',
                    textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    letterSpacing: '-1px'
                }}>
                    {hub.hubName}
                </h1>
                <p style={{
                    color: 'rgba(255,255,255,0.95)',
                    fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                    lineHeight: '1.6',
                    margin: '0 auto',
                    maxWidth: '800px',
                    textShadow: '0 5px 15px rgba(0,0,0,0.4)',
                    fontWeight: '400'
                }}>
                    {hub.hubOverview}
                </p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                {/* Information Card */}
                <div
                    ref={el => sectionRefs.current[0] = el}
                    className="glass-card reveal-section"
                    style={{ padding: '60px', border: '1px solid rgba(255,255,255,0.4)' }}
                >
                    <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: '#0f172a', textAlign: 'center', marginBottom: '20px', fontWeight: '700' }}>{hub.hubName} Hub</h2>
                    <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#475569', lineHeight: '1.6', textAlign: 'center', marginBottom: '50px' }}>Part of our Innovation Hub – Information Technology. Join us to explore more.</p>

                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px'
                    }}>
                        <div style={{
                            width: '100%',
                            minHeight: 'clamp(300px, 50vh, 450px)',
                            backgroundColor: '#f8fafc',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#94a3b8',
                            border: '2px dashed #e2e8f0',
                            fontSize: '1.3rem',
                            overflow: 'hidden',
                            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
                        }}>
                            {(hub.events && hub.events.length > 0 && (hub.events[0].images?.length > 0 || hub.events[0].image)) ? (
                                <img
                                    src={hub.events[0].images?.[featuredActiveImageIndex] || hub.events[0].image}
                                    alt="Featured Event Image"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '12px'
                                    }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = placeholderImage;
                                    }}
                                />
                            ) : (
                                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <img
                                        src={placeholderImage}
                                        alt="Placeholder"
                                        style={{ width: '80px', opacity: 0.2 }}
                                    />
                                    <span style={{ color: '#94a3b8', fontSize: '1rem' }}>No Featured Image</span>
                                </div>
                            )}
                        </div>

                        {/* Multi-image Thumbnails (Featured Event) */}
                        {hub.events?.[0]?.images?.length > 1 && (
                            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                                {hub.events[0].images.slice(0, 3).map((imgUrl, idx) => ( // Show up to 3 thumbnails
                                    <img
                                        key={idx}
                                        src={imgUrl}
                                        alt={`Thumbnail ${idx + 1}`}
                                        style={{
                                            width: '80px',
                                            height: '60px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            border: featuredActiveImageIndex === idx ? '2px solid #2563eb' : '2px solid transparent',
                                            transition: 'border 0.2s ease-in-out'
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

                    <div style={{ backgroundColor: '#f1f5f9', padding: '40px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h4 style={{ margin: 0, fontSize: '1.6rem', color: '#1e293b', fontWeight: '600' }}>Hub Highlights & Latest Info</h4>
                            {hub.events && hub.events.length > 0 && hub.events[0].registerLink && (
                                <a
                                    href={hub.events[0].registerLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: '10px 25px',
                                        backgroundColor: '#0f172a',
                                        color: 'white',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        fontWeight: '700',
                                        fontSize: '1rem',
                                        transition: 'transform 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    Register Now
                                </a>
                            )}
                        </div>
                        <p style={{ margin: 0, color: '#334155', lineHeight: '1.8', fontSize: '1.1rem' }}>
                            {hub.hubOverview} This section serves as a placeholder demonstrating where rich formatted text, event schedules, joining criteria, or specific announcements would be displayed when connected to a real backend.
                        </p>
                    </div>
                </div>

                {/* Upcoming Events Section */}
                <div
                    ref={el => sectionRefs.current[1] = el}
                    className="reveal-section"
                    style={{ marginTop: '20px' }}
                >
                    <h3 style={{ borderBottom: '2px solid rgba(255,255,255,0.2)', paddingBottom: '20px', color: 'white', fontSize: '2.2rem', margin: '0 0 40px 0', textShadow: '0 4px 12px rgba(0,0,0,0.3)', fontWeight: '700' }}>
                        Upcoming Events
                    </h3>
                    {hub.events && hub.events.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            {hub.events.map(event => (
                                <div
                                    key={event.eventId}
                                    className="glass-card hover-elevate"
                                    style={{
                                        padding: 'clamp(20px, 5%, 40px)',
                                        display: 'flex',
                                        gap: '30px',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        border: '1px solid rgba(255,255,255,0.4)'
                                    }}
                                >
                                    {/* Event Image Box */}
                                    <div style={{
                                        width: '180px',
                                        height: '110px',
                                        backgroundColor: '#f8fafc',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        border: '1px solid #e2e8f0'
                                    }}>
                                        {event.image ? (
                                            <img
                                                src={event.image}
                                                alt="Event"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "/assets/event-placeholder.jpeg";
                                                }}
                                            />
                                        ) : (
                                            <img
                                                src="/assets/event-placeholder.jpeg"
                                                alt="Placeholder"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', opacity: 0.5 }}
                                            />
                                        )}
                                    </div>

                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <strong style={{ fontSize: '1.6rem', color: '#0f172a', fontWeight: '700' }}>{event.eventTitle}</strong>
                                        <span style={{ fontSize: '1.1rem', color: '#475569', maxWidth: '600px' }}>{event.eventDescription}</span>
                                        <div style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '10px', display: 'flex', gap: '15px' }}>
                                            <span>ID: {event.eventId}</span>
                                            <span>•</span>
                                            <span>Media: {event.mediaType}</span>
                                            {event.registerLink && (
                                                <div style={{ marginTop: '5px' }}>
                                                    <a
                                                        href={event.registerLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            display: 'inline-block',
                                                            padding: '8px 20px',
                                                            backgroundColor: '#2563eb',
                                                            color: 'white',
                                                            borderRadius: '8px',
                                                            textDecoration: 'none',
                                                            fontWeight: '600',
                                                            fontSize: '0.9rem',
                                                            transition: 'background-color 0.2s'
                                                        }}
                                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                                                    >
                                                        Register Now
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{
                                            color: '#1e293b',
                                            fontSize: '1.1rem',
                                            backgroundColor: '#f1f5f9',
                                            padding: '12px 25px',
                                            borderRadius: '12px',
                                            fontWeight: '700',
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                            display: 'block'
                                        }}>
                                            {event.eventDate}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{
                            padding: '80px',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: '24px',
                            border: '2px dashed rgba(255,255,255,0.2)',
                            textAlign: 'center',
                            color: 'white',
                            backdropFilter: 'blur(5px)'
                        }}>
                            <p style={{ margin: 0, fontSize: '1.4rem', textShadow: '0 2px 8px rgba(0,0,0,0.2)', opacity: 0.8 }}>No upcoming events currently scheduled for this hub.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HubDetails;
