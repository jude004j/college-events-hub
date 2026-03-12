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
        <div className="hero">
            {/* Hero Media (Image) */}
            <img
                key={`media-${currentIndex}`}
                src={currentSlide.image}
                alt={currentSlide.title}
                className="hero-media animate-fade-in"
            />

            {/* Dark Overlay for Text Readability */}
            <div className="hero-overlay"></div>

            {/* Bottom Gradient Fade */}
            <div className="hero-gradient"></div>

            {/* Text Overlay */}
            <div className="hero-content">
                <h1
                    key={`title-${currentIndex}`}
                    className="hero-title"
                    style={{ animation: 'fadeInUp 0.8s ease-out forwards' }}
                >
                    {currentSlide.title}
                </h1>
                <p
                    key={`subtitle-${currentIndex}`}
                    className="hero-subtitle"
                    style={{ animation: 'fadeInUp 0.8s ease-out 0.3s forwards', opacity: 0 }}
                >
                    {currentSlide.subtitle}
                </p>
            </div>

            {/* Dots */}
            <div className="hero-dots">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default HeroSlider;
