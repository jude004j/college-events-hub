import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';

function ManageGallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/gallery`);
            if (response.ok) {
                const data = await response.json();
                setImages(data);
            } else {
                setError('Failed to fetch gallery images');
            }
        } catch (err) {
            setError('Could not connect to server');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prev => [...prev, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviews]);
    };

    const removePreview = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        setUploading(true);
        const token = localStorage.getItem('adminToken');
        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('images', file);
        });

        try {
            const response = await fetch(`${API_BASE_URL}/api/gallery`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const newImages = await response.json();
                setImages(prev => [...newImages, ...prev]);
                setSelectedFiles([]);
                setPreviewUrls([]);
                alert('Images uploaded successfully!');
            } else {
                alert('Upload failed');
            }
        } catch (err) {
            alert('Error connecting to server');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this image from gallery?')) return;

        const token = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setImages(images.filter(img => img._id !== id));
            } else {
                alert('Failed to delete image');
            }
        } catch (err) {
            alert('Error deleting image');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Upload Section */}
            <div className="gallery-upload-container">
                <div className="admin-card">
                    <h3 className="admin-card-title" style={{ textAlign: 'center' }}>Upload New Photos</h3>

                    <div className="upload-dropzone">
                        <input
                            type="file"
                            id="gallery-upload"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <label
                            htmlFor="gallery-upload"
                            style={{
                                padding: '12px 24px',
                                background: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                color: '#475569',
                                fontWeight: '600',
                                display: 'inline-block',
                                transition: 'all 0.2s',
                                marginBottom: '10px'
                            }}
                        >
                            📁 Select Photos
                        </label>
                        <p style={{ margin: '10px 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>
                            Supports JPEG, PNG, WEBP. You can select multiple files.
                        </p>

                        {previewUrls.length > 0 && (
                            <div style={{ marginTop: '30px' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
                                    {previewUrls.map((url, index) => (
                                        <div key={index} style={{ position: 'relative' }}>
                                            <img
                                                src={url}
                                                alt="Preview"
                                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '2px solid white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                                            />
                                            <button
                                                onClick={() => removePreview(index)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '-8px',
                                                    right: '-8px',
                                                    background: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: '24px',
                                                    height: '24px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '12px',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading}
                                    className="admin-logout-btn"
                                    style={{
                                        maxWidth: '200px',
                                        margin: '0 auto',
                                        background: 'var(--primary)',
                                        borderRadius: '50px'
                                    }}
                                >
                                    {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} Photos`}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Gallery Grid Section */}
            <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 className="admin-card-title" style={{ margin: 0 }}>Gallery Photos ({images.length})</h3>
                </div>

                {loading ? (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                        <div className="animate-pulse">Loading gallery...</div>
                    </div>
                ) : error ? (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#ef4444' }}>{error}</div>
                ) : images.length === 0 ? (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>Gallery is empty. Upload some memories!</div>
                ) : (
                    <div className="gallery-admin-grid">
                        {images.map((image) => (
                            <div key={image._id} className="gallery-admin-item">
                                <img
                                    src={image.imageUrl}
                                    alt="Gallery"
                                />
                                <div className="gallery-admin-overlay">
                                    <button
                                        onClick={() => handleDelete(image._id)}
                                        style={{
                                            padding: '10px 20px',
                                            background: '#ef4444',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50px',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageGallery;
