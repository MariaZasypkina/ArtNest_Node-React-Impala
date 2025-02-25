import React, { useEffect, useState } from "react";

const ArtworkModal = ({ artwork, onClose }) => {

    const [comments, setComments] = useState([]); 
    const [newComment, setNewComment] = useState(""); 

    if (!artwork) return null;

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";  // Disable background scroll

        if (artwork) {
            fetch(`/api/comments/${artwork._id}`) 
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(err => console.error("Failed to fetch comments:", err));
    }

        return () => {
            document.body.style.overflow = "auto";  // Enable scroll when modal closes
        };
    }, [artwork]);

// Handle new comment submission
const handleAddComment = async () => {
    if (!newComment.trim()) return; //do nothing if the field is empty

    const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkId: artwork._id, text: newComment })
    });

    if (response.ok) {
        const addedComment = await response.json();
        setComments([...comments, addedComment]);  // add a new comment to a list
        setNewComment("");  // clear the input field
    } else {
        console.error("Failed to add comment");
    }
};

    return (
        <div 
            className="modal" 
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                background: 'rgba(0, 0, 0, 0.7)', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                zIndex: 1000
            }}
        >
            <div 
                className="modal-content" 
                style={{ 
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '10px', 
                    width: '80%', 
                    maxWidth: '600px', 
                    color: '#333',
                    maxHeight: '90vh',  // Ограничиваем высоту окна
                    overflowY: 'auto'   // Включаем скролл внутри модалки
                }}
            >
                <h2>{artwork.title}</h2>
                <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title} 
                    style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }}
                />

                <div style={{ marginTop: '10px' }}>
                    <p><strong>🎨 Artist:</strong> {artwork.artist}</p>
                    <p><strong>😊 Mood:</strong> {artwork.mood}</p>
                    <p><strong>🖌 Media:</strong> {artwork.media}</p>
                    <p><strong>📝 Description:</strong> {artwork.description}</p>
                    <p><strong>📅 Created At:</strong> {new Date(artwork.createdAt).toLocaleDateString()}</p>
                </div>

{/* Add Comment Section */}
<div style={{ marginTop: '20px' }}>
                    <h3>Add a Comment</h3>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment here..."
                        rows="3"
                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    ></textarea>
                    <button 
                        onClick={handleAddComment}
                        style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Add Comment
                    </button>
                </div>

                {/* Display Comments Section */}
                <div style={{ marginTop: '20px' }}>
                    <h3>Comments</h3>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <p key={comment._id} style={{ background: '#f1f1f1', padding: '5px', borderRadius: '5px' }}>
                                {comment.text}
                            </p>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>


                {/* close button */}
                <button 
                    onClick={onClose} 
                    style={{ 
                        display: 'block', 
                        margin: '20px auto 0', 
                        backgroundColor: '#f44336', 
                        color: 'white', 
                        border: 'none', 
                        padding: '10px 20px', 
                        borderRadius: '5px', 
                        cursor: 'pointer' 
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ArtworkModal;
