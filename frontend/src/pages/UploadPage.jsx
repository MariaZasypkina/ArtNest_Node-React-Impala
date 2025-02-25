import React, { useState } from 'react';

function UploadPage() {
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        description: '',
        mood: '',
        media: '',
        imageUrl: ''
    });

    const [showModal, setShowModal] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5010/api/upload-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setShowModal(true); // Show success message
                setFormData({ title: '', artist: '', description: '', mood: '', media: '', imageUrl: '' }); // Clear form
            } else {
                alert('Failed to submit artwork. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>Submit Your Artwork</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:<br></br></label>
                <input type="text" name="title" value={formData.title} className="input-field" onChange={handleChange} required />
                <br></br>
                <label>Artist:<br></br></label>
                <input type="text" name="artist" value={formData.artist} className="input-field" onChange={handleChange} required />
                <br></br>
                <label>Description:<br></br></label>
                <textarea name="description" value={formData.description} className="input-field" onChange={handleChange} required />
                <br></br>
                <label>Mood:<br></br></label>
                <input type="text" name="mood" value={formData.mood} className="input-field" onChange={handleChange} />
                <br></br>
                <label>Media:<br></br></label>
                <input type="text" name="media" value={formData.media} className="input-field" onChange={handleChange} />
                <br></br>
                <label>Image URL:<br></br></label>
                <input type="url" name="imageUrl" value={formData.imageUrl} className="input-field" onChange={handleChange} required />
                <br></br><br></br>
                <button type="submit" style={{ marginTop: '10px' }}className="submit-button" >Submit Artwork</button>
            </form>

            {showModal && (
    <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
        <div style={{
            backgroundColor: 'white', padding: '20px', borderRadius: '10px',
            textAlign: 'center', color: '#333' 
        }}>
            <h3 style={{ color: '#333' }}>Thank you for submitting your artwork!</h3>
            <p style={{ color: '#555' }}>
                Our administrators will review your upload and publish it within 36 hours.
            </p>
            <button onClick={() => setShowModal(false)} style={{
                padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white',
                border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}>
                Close
            </button>
        </div>
    </div>
)}

        </div>
    );
}

export default UploadPage;
