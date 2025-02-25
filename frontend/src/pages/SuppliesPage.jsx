import React from 'react';

function SuppliesPage() {
    return (
        <div style={{ margin: '0', padding: '0', width: '100vw', height: '100vh' }}>

            <div style={{
                position: 'relative',
                width: '100vw',   // all screen wide
                height: '90vh',   // almost all height
                overflow: 'hidden',
                margin: '0 auto'
            }}>   <iframe
                src="https://art-supplies-list-final.onrender.com" 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                }}
                title="Art Supplies List"
                allowFullScreen
            ></iframe>
        </div>
    </div>
);
}

export default SuppliesPage;