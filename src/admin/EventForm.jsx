import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const HUBS_LIST = [
    "BlackOps",
    "Visionary Visions",
    "Tech Tales",
    "Tech Fusion",
    "Wonder Web",
    "Geek Wiz",
    "Hot Bait Hub",
    "Pixel Tech",
    "Tech Titan",
    "Skill Aura"
];

function EventForm({ isEdit = false }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageFiles, setImageFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        hub: '',
        date: '',
        registerLink: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (imageFiles.length + files.length > 3) {
            alert("Maximum 3 images allowed");
            return;
        }

        const newFiles = [...imageFiles, ...files];
        setImageFiles(newFiles);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviews]);
        setUploadedImageUrls([]); // Reset confirmed uploads if new ones added
    };

    const removeImage = (index) => {
        const updatedFiles = imageFiles.filter((_, i) => i !== index);
        const updatedPreviews = previewUrls.filter((_, i) => i !== index);
        setImageFiles(updatedFiles);
        setPreviewUrls(updatedPreviews);
        setUploadedImageUrls([]);
    };

    const handleImageUpload = async () => {
        if (imageFiles.length === 0) return;
        setIsUploading(true);
        const formDataUpload = new FormData();
        imageFiles.forEach(file => {
            formDataUpload.append('images', file);
        });

        try {
            const response = await fetch(`${API_BASE_URL}/api/upload-image`, {
                method: 'POST',
                body: formDataUpload,
            });

            if (response.ok) {
                const data = await response.json();
                setUploadedImageUrls(data.imageUrls);
                alert('Images uploaded successfully!');
            } else {
                alert('Image upload failed');
            }
        } catch (err) {
            console.error('Upload Error:', err);
            alert('Could not connect to upload server');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // If images were selected but not uploaded
        if (imageFiles.length > 0 && uploadedImageUrls.length === 0) {
            alert("Please click 'Confirm Upload' for your selected images first!");
            return;
        }
        setLoading(true);

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    date: formData.date,
                    hub: formData.hub,
                    subHub: `${formData.hub} Main`, // Following the seeding script naming convention
                    registerLink: formData.registerLink,
                    images: uploadedImageUrls.length > 0 ? uploadedImageUrls : ["/assets/event-placeholder.jpeg"]
                })
            });

            if (response.ok) {
                alert(isEdit ? "Event Updated Successfully!" : "Event Published Permanently!");
                navigate('/admin/manage-events');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (err) {
            console.error("Save Error:", err);
            alert("Could not connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="admin-section-title">{isEdit ? 'Edit Event' : 'Create New Event'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Event Title */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Event Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="e.g. Workshop on Web Development"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="admin-input"
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%', fontSize: '0.95rem' }}
                    />
                </div>

                {/* Description */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        placeholder="Provide details about the event..."
                        required
                        value={formData.description}
                        onChange={handleChange}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%', fontSize: '0.95rem', resize: 'vertical' }}
                    ></textarea>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    {/* Hub Selection */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Target Hub</label>
                        <select
                            name="hub"
                            value={formData.hub}
                            onChange={handleChange}
                            required
                            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontSize: '0.95rem' }}
                        >
                            <option value="">Select Hub</option>
                            {HUBS_LIST.map((hubName, idx) => (
                                <option key={idx} value={hubName}>{hubName}</option>
                            ))}
                        </select>
                    </div>

                    {/* Event Date */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Event Date</label>
                        <input
                            type="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%', fontSize: '0.95rem' }}
                        />
                    </div>
                </div>

                {/* Registration Link */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Registration URL (Optional)</label>
                    <input
                        type="url"
                        name="registerLink"
                        placeholder="https://link-to-registration-form.com"
                        value={formData.registerLink}
                        onChange={handleChange}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%', fontSize: '0.95rem' }}
                    />
                </div>

                {/* Media Upload Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Event Images (Max 3)</label>
                    <div className="upload-dropzone" style={{ padding: '32px 20px' }}>
                        {/* Selected Previews */}
                        {previewUrls.length > 0 && (
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
                                {previewUrls.map((url, index) => (
                                    <div key={index} style={{ position: 'relative' }}>
                                        <img
                                            src={url}
                                            alt={`Preview ${index}`}
                                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '2px solid white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
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
                                                fontSize: '12px'
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                            {imageFiles.length < 3 && (
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                        id="event-image-upload"
                                    />
                                    <label
                                        htmlFor="event-image-upload"
                                        className="admin-logout-btn"
                                        style={{ background: 'white', color: '#475569', border: '1px solid #e2e8f0', width: 'auto', padding: '10px 20px', fontSize: '0.875rem' }}
                                    >
                                        📁 {previewUrls.length > 0 ? 'Add More Images' : 'Select Images'}
                                    </label>
                                </>
                            )}

                            {imageFiles.length > 0 && uploadedImageUrls.length === 0 && (
                                <button
                                    type="button"
                                    onClick={handleImageUpload}
                                    disabled={isUploading}
                                    className="admin-logout-btn"
                                    style={{ background: 'var(--primary)', width: 'auto', padding: '10px 24px', fontSize: '0.875rem' }}
                                >
                                    {isUploading ? 'Uploading...' : `Confirm Upload (${imageFiles.length} files)`}
                                </button>
                            )}

                            {uploadedImageUrls.length > 0 && (
                                <p style={{ color: '#16a34a', fontWeight: '700', margin: 0, fontSize: '0.875rem' }}>✅ {uploadedImageUrls.length} Images Ready for Publication</p>
                            )}

                            {imageFiles.length === 0 && (
                                <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>No images? A default event placeholder will be used.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                    <button
                        type="submit"
                        disabled={loading || (imageFiles.length > 0 && uploadedImageUrls.length === 0)}
                        className="admin-logout-btn"
                        style={{
                            flex: 1,
                            background: (loading || (imageFiles.length > 0 && uploadedImageUrls.length === 0)) ? '#cbd5e1' : '#0f172a',
                        }}
                    >
                        {loading ? 'Processing...' : (isEdit ? 'Update Event' : 'Publish Event')}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/admin/manage-events')}
                        className="admin-logout-btn"
                        style={{
                            background: 'white',
                            color: '#475569',
                            border: '1px solid #e2e8f0',
                            flex: 0.5
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EventForm;
