import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
            const response = await fetch('http://localhost:5000/api/upload-image', {
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
            const response = await fetch('http://localhost:5000/api/events', {
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
        <div className="admin-form-container" style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h2 style={{ marginBottom: '24px', color: '#1e293b' }}>{isEdit ? 'Edit Event' : 'Add New Event'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Event Title */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: '#444', fontWeight: 'bold' }}>Event Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter Event Title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                </div>

                {/* Description */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: '#444', fontWeight: 'bold' }}>Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        placeholder="Event details..."
                        required
                        value={formData.description}
                        onChange={handleChange}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', resize: 'vertical' }}
                    ></textarea>
                </div>

                {/* Hub Selection */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: '#444', fontWeight: 'bold' }}>Hub Selection</label>
                    <select
                        name="hub"
                        value={formData.hub}
                        onChange={handleChange}
                        required
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: 'white' }}
                    >
                        <option value="">-- Choose a Hub --</option>
                        {HUBS_LIST.map((hubName, idx) => (
                            <option key={idx} value={hubName}>{hubName}</option>
                        ))}
                    </select>
                </div>

                {/* Event Date */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: '#444', fontWeight: 'bold' }}>Event Date</label>
                    <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                </div>

                {/* Registration Link */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: '#444', fontWeight: 'bold' }}>Event Registration Link</label>
                    <input
                        type="url"
                        name="registerLink"
                        placeholder="https://forms.google.com/..."
                        value={formData.registerLink}
                        onChange={handleChange}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                </div>

                {/* Media Upload Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: '#444', fontWeight: 'bold' }}>Event Images (Max 3)</label>
                    <div style={{
                        padding: '24px',
                        borderRadius: '8px',
                        border: '2px dashed #ccc',
                        background: '#fafafa',
                        textAlign: 'center'
                    }}>
                        {/* Selected Previews */}
                        {previewUrls.length > 0 && (
                            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
                                {previewUrls.map((url, index) => (
                                    <div key={index} style={{ position: 'relative' }}>
                                        <img
                                            src={url}
                                            alt={`Preview ${index}`}
                                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
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
                                                fontSize: '12px'
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {imageFiles.length < 3 && (
                            <div style={{ marginBottom: previewUrls.length > 0 ? '15px' : '0' }}>
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
                                    style={{
                                        padding: '10px 20px',
                                        background: 'white',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        color: '#666'
                                    }}
                                >
                                    {previewUrls.length > 0 ? 'Add More Images' : 'Select Images'}
                                </label>
                            </div>
                        )}

                        {imageFiles.length > 0 && uploadedImageUrls.length === 0 && (
                            <div style={{ marginTop: '10px' }}>
                                <button
                                    type="button"
                                    onClick={handleImageUpload}
                                    disabled={isUploading}
                                    style={{
                                        padding: '10px 25px',
                                        background: '#2563eb',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: isUploading ? 'not-allowed' : 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {isUploading ? 'Uploading...' : `Confirm Upload (${imageFiles.length} files)`}
                                </button>
                            </div>
                        )}

                        {uploadedImageUrls.length > 0 && (
                            <p style={{ color: '#16a34a', fontWeight: 'bold', margin: '10px 0 0 0' }}>✅ {uploadedImageUrls.length} Images Ready</p>
                        )}

                        {imageFiles.length === 0 && (
                            <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '10px' }}>No image? A default placeholder will be used.</p>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                    <button
                        type="submit"
                        disabled={loading || (imageFiles.length > 0 && uploadedImageUrls.length === 0)}
                        className="admin-btn"
                        style={{
                            flex: 1,
                            background: (loading || (imageFiles.length > 0 && uploadedImageUrls.length === 0)) ? '#ccc' : '#0a0a0a',
                            color: 'white',
                            border: 'none',
                        }}
                    >
                        {loading ? 'Processing...' : 'Publish Event'}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/admin/manage-events')}
                        className="admin-btn"
                        style={{
                            background: '#eee',
                            border: 'none',
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
