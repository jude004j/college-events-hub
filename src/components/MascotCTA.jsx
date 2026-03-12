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
            style={{
                background: 'linear-gradient(135deg, #0b1d3a 0%, #0f2a55 100%)',
                padding: '120px 20px',
                color: 'white',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
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
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-5%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
                filter: 'blur(50px)',
                zIndex: 1,
                pointerEvents: 'none'
            }}></div>

            <div
                className="mascot-cta-content container"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '40px',
                    position: 'relative',
                    zIndex: 2,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
            >
                {/* Mascot Video Section */}
                <div
                    className="mascot-float"
                    style={{
                        flex: '1',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative'
                    }}
                >
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
                <div
                    style={{
                        flex: '1.2',
                        textAlign: 'left',
                        padding: '20px'
                    }}
                >
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
                            fontSize: 'clamp(2.5rem, 4vw, 3.8rem)',
                            fontWeight: '800',
                            marginBottom: '24px',
                            color: 'white',
                            lineHeight: '1.1',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Join Our Next Event
                    </h2>
                    <p
                        style={{
                            fontSize: '1.2rem',
                            color: '#cbd5e1',
                            marginBottom: '40px',
                            lineHeight: '1.7',
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
                            padding: '20px 48px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '100px',
                            fontSize: '1.15rem',
                            fontWeight: '700',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            boxShadow: '0 12px 24px rgba(37, 99, 235, 0.4)',
                            border: 'none',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.08) translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1) translateY(0)';
                            e.currentTarget.style.boxShadow = '0 12px 24px rgba(37, 99, 235, 0.4)';
                        }}
                    >
                        Register Now
                    </a>
                </div>
            </div>

            {/* In-component responsive adjustments */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 991px) {
                    .mascot-cta-content {
                        flex-direction: column !important;
                        text-align: center !important;
                        gap: 60px !important;
                    }
                    .mascot-cta-content div {
                        text-align: center !important;
                    }
                    .mascot-cta-content p {
                        margin-left: auto;
                        margin-right: auto;
                    }
                }

                /* Floating Animation handled via index.css class .mascot-float */
                @keyframes mascotFloat {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-20px); }
                  100% { transform: translateY(0px); }
                }
            `}} />
        </section>
    );
};

export default MascotCTA;
