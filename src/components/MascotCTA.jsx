import React, { useEffect, useRef, useState } from 'react';

const MascotCTA = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="register-cta"
            className="mascot-cta-section section-padding"
            style={{ background: 'linear-gradient(135deg, #0b1d3a 0%, #0f2a55 100%)' }}
        >
            {/* Background Decorative Elements */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 1,
                pointerEvents: 'none'
            }}></div>
            
            <div
                className="mascot-cta-content container"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
            >
                {/* Mascot Video Section */}
                <div className="mascot-video-container mascot-float">
                    {/* Glow effect behind mascot */}
                    <div style={{
                        position: 'absolute',
                        width: '250px',
                        height: '250px',
                        background: 'rgba(59, 130, 246, 0.3)',
                        filter: 'blur(80px)',
                        borderRadius: '50%',
                        zIndex: -1
                    }}></div>

                    <video
                        src="/assets/videos/mascot.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                            width: '100%',
                            maxWidth: 'clamp(280px, 40vw, 320px)',
                            height: 'auto',
                            borderRadius: '30px',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    />
                </div>

                {/* Text Content Section */}
                <div className="mascot-text-container">
                    <span style={{
                        color: '#38bdf8',
                        fontSize: '0.9rem',
                        fontWeight: '800',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        marginBottom: '16px',
                        display: 'block'
                    }}>
                        Ready for Innovation?
                    </span>
                    <h2
                        style={{
                            marginBottom: '24px',
                            color: 'white',
                        }}
                    >
                        Join Our Next Event
                    </h2>
                    <p
                        style={{
                            color: '#cbd5e1',
                            marginBottom: '40px',
                            maxWidth: '550px'
                        }}
                    >
                        Be part of workshops, hackathons, and innovation across our hubs. Connect with peers and build the future together.
                    </p>
                    <a
                        href="#hubs-section"
                        className="cta-button"
                        style={{
                            display: 'inline-block',
                            padding: '16px 40px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '100px',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 12px 24px rgba(37, 99, 235, 0.4)',
                            border: 'none',
                        }}
                    >
                        Register Now
                    </a>
                </div>
            </div>
        </section>
    );
};

export default MascotCTA;
