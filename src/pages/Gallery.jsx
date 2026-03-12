import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { siteData } from '../data/dummyData';
import API_BASE_URL from '../config/api';

function GalleryPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/gallery`);
                if (response.ok) {
                    const data = await response.json();
                    setImages(data);
                }
            } catch (err) {
                console.error('Error fetching gallery:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
        window.scrollTo(0, 0);
    }, []);

    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header onGoHome={handleGoHome} headerData={siteData.header} />

            <main style={{ flex: 1, padding: '120px 20px 100px 20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <Link
                            to="/"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: '#94a3b8',
                                textDecoration: 'none',
                                fontSize: '1rem',
                                fontWeight: '500',
                                transition: 'color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                        >
                            <span style={{ fontSize: '1.2rem' }}>←</span> Back to Home
                        </Link>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'white', marginBottom: '10px' }}>Gallery</h1>
                        <p style={{ color: '#3b82f6', fontSize: '1.4rem', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
                            Past Events & Memories
                        </p>
                        <div style={{ width: '100px', height: '4px', background: '#3b82f6', margin: '20px auto', borderRadius: '2px' }}></div>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '100px', fontSize: '1.2rem' }}>
                            Loading our memories...
                        </div>
                    ) : images.length === 0 ? (
                        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '100px', fontSize: '1.2rem' }}>
                            No memories found yet.
                        </div>
                    ) : (
                        <div className="gallery-grid">
                            {images.map((img) => (
                                <div
                                    key={img._id}
                                    onClick={() => setSelectedImage(img)}
                                    style={{
                                        cursor: 'pointer',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        aspectRatio: '16/10',
                                        position: 'relative',
                                        transform: 'translateZ(0)',
                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                        e.currentTarget.querySelector('.overlay').style.opacity = 1;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.querySelector('.overlay').style.opacity = 0;
                                    }}
                                >
                                    <img
                                        src={img.imageUrl}
                                        alt={img.caption || 'Gallery Image'}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div className="overlay" style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'linear-gradient(to bottom, transparent 0%, rgba(59, 130, 246, 0.6) 100%)',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        justifyContent: 'center',
                                        paddingBottom: '30px',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease'
                                    }}>
                                        <span style={{
                                            background: 'white',
                                            color: '#1e293b',
                                            padding: '12px 24px',
                                            borderRadius: '50px',
                                            fontWeight: '700',
                                            fontSize: '0.9rem',
                                            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                                        }}>
                                            Expand Photo
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.95)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 3000,
                        padding: '20px',
                        cursor: 'zoom-out'
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image/content
                        style={{
                            position: 'relative',
                            maxWidth: '90%',
                            maxHeight: '90%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'default'
                        }}
                    >
                        <img
                            src={selectedImage.imageUrl}
                            alt="Full Screen"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '80vh',
                                borderRadius: '12px',
                                boxShadow: '0 0 50px rgba(59, 130, 246, 0.3)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                objectFit: 'contain'
                            }}
                        />
                        {selectedImage.caption && (
                            <div style={{
                                marginTop: '20px',
                                textAlign: 'center',
                                color: 'white',
                                padding: '10px 20px',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '8px',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '500' }}>
                                    {selectedImage.caption}
                                </p>
                            </div>
                        )}
                        <button
                            onClick={() => setSelectedImage(null)}
                            style={{
                                position: 'absolute',
                                top: '-50px',
                                right: '-10px',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                color: 'white',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <footer style={{
                textAlign: 'center', padding: '40px 0',
                backgroundColor: '#020617', color: '#64748b',
                borderTop: '1px solid #1e293b'
            }}>
                <p style={{ margin: 0 }}>{siteData.footer.text}</p>
            </footer>
        </div>
    );
}

export default GalleryPage;
