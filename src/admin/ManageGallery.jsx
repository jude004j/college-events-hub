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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Upload Section */}
            <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', padding: '30px' }}>
                <h3 style={{ margin: '0 0 20px 0', color: '#1e293b' }}>Upload New Photos</h3>

                <div style={{
                    padding: '40px',
                    borderRadius: '12px',
                    border: '2px dashed #e2e8f0',
                    background: '#f8fafc',
                    textAlign: 'center'
                }}>
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
                            transition: 'all 0.2s'
                        }}
                    >
                        📁 Select Photos
                    </label>
                    <p style={{ marginTop: '12px', fontSize: '0.85rem', color: '#64748b' }}>
                        Supports JPEG, PNG, WEBP. You can select multiple files.
                    </p>

                    {previewUrls.length > 0 && (
                        <div style={{ marginTop: '30px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', marginBottom: '20px' }}>
                                {previewUrls.map((url, index) => (
                                    <div key={index} style={{ position: 'relative' }}>
                                        <img
                                            src={url}
                                            alt="Preview"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '2px solid white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
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
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
                                style={{
                                    padding: '12px 30px',
                                    background: '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '700',
                                    cursor: uploading ? 'not-allowed' : 'pointer',
                                    opacity: uploading ? 0.7 : 1
                                }}
                            >
                                {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} Photos`}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Gallery Grid Section */}
            <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, color: '#1e293b' }}>Gallery Photos ({images.length})</h3>
                </div>

                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading gallery...</div>
                ) : error ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>{error}</div>
                ) : images.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Gallery is empty. Upload some memories!</div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '20px'
                    }}>
                        {images.map((image) => (
                            <div key={image._id} style={{
                                position: 'relative',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                aspectRatio: '1/1',
                                group: 'true'
                            }}>
                                <img
                                    src={image.imageUrl}
                                    alt="Gallery"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: 0,
                                    transition: 'opacity 0.2s',
                                    cursor: 'default'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                                >
                                    <button
                                        onClick={() => handleDelete(image._id)}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#ef4444',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem'
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
