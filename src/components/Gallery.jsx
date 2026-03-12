import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Gallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/gallery');
                if (response.ok) {
                    const data = await response.json();
                    setImages(data.slice(0, 3)); // Only take top 3
                }
            } catch (err) {
                console.error('Error fetching gallery:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    if (loading) return null;

    return (
        <section style={{
            padding: 'clamp(60px, 10vh, 100px) 20px',
            backgroundColor: '#0f172a',
            color: 'white'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '15px' }}>Event Highlights</h2>
                    <div style={{ width: '80px', height: '4px', background: '#3b82f6', margin: '0 auto', borderRadius: '2px' }}></div>
                    <p style={{ marginTop: '20px', color: '#94a3b8', fontSize: '1.1rem' }}>A glimpse into our past events and memories.</p>
                </div>

                <div className="gallery-grid container" style={{
                    marginBottom: '50px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px'
                }}>
                    {images.map((img) => (
                        <div
                            key={img._id}
                            style={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                aspectRatio: '16/10',
                                position: 'relative',
                                transition: 'transform 0.4s ease',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <img
                                src={img.imageUrl}
                                alt="Gallery Preview"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={() => navigate('/gallery')}
                        style={{
                            padding: '16px 40px',
                            background: 'transparent',
                            color: '#3b82f6',
                            border: '2px solid #3b82f6',
                            borderRadius: '50px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#3b82f6';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#3b82f6';
                        }}
                    >
                        View Full Gallery <span style={{ fontSize: '1.4rem' }}>→</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Gallery;
