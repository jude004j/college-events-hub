import React, { useState, useEffect } from 'react';

function HeroSlider({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!slides || slides.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides]);

    if (!slides || slides.length === 0) return null;

    const currentSlide = slides[currentIndex];

    return (
        <>
            <style>
                {`
                    @keyframes fadeUp {
                        0% {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    .hero-title {
                        animation: fadeUp 0.8s ease-out forwards;
                    }
                    .hero-subtitle {
                        opacity: 0;
                        animation: fadeUp 0.8s ease-out 0.3s forwards;
                    }
                `}
            </style>
            <div className="hero">
                {/* Hero Media (Image) */}
                <img
                    key={`media-${currentIndex}`}
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="hero-media animate-fade-in"
                />

                {/* Dark Overlay for Text Readability */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1
                }}></div>

                {/* Bottom Gradient Fade */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '25vh',
                    background: 'linear-gradient(to bottom, transparent, #0f172a)',
                    zIndex: 1
                }}></div>

                {/* Text Overlay */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'white',
                    padding: '0 20px',
                    zIndex: 2,
                    maxWidth: '1200px'
                }}>
                    <h1
                        key={`title-${currentIndex}`}
                        className="hero-title"
                    >
                        {currentSlide.title}
                    </h1>
                    <p
                        key={`subtitle-${currentIndex}`}
                        className="hero-subtitle"
                    >
                        {currentSlide.subtitle}
                    </p>
                </div>

                {/* Dots */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '12px',
                    zIndex: 2
                }}>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className="hero-dot"
                            onClick={() => setCurrentIndex(index)}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                border: 'none',
                                backgroundColor: index === currentIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
                                cursor: 'pointer',
                                padding: 0,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default HeroSlider;
