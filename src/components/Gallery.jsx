import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';

function Gallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/gallery`);
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
        <section className="section-padding" style={{ backgroundColor: '#0f172a', color: 'white' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vh, 60px)' }}>
                    <h2 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Event Highlights</h2>
                    <div style={{ width: '80px', height: '4px', background: '#3b82f6', margin: '0 auto', borderRadius: '2px' }}></div>
                    <p style={{ marginTop: '20px', color: '#94a3b8' }}>A glimpse into our past events and memories.</p>
                </div>

                <div className="gallery-grid">
                    {images.map((img) => (
                        <div key={img._id} className="gallery-item">
                            <img src={img.imageUrl} alt="Gallery Preview" />
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <button onClick={() => navigate('/gallery')} className="btn-outline">
                        View Full Gallery <span>→</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Gallery;
