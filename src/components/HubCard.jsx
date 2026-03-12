import React from 'react';

function HubCard({ hub, onSelectHub }) {
    if (!hub) return null;

    const isNew = hub.events?.some(event => {
        if (!event.eventCreatedAt) return false;
        const createdDate = new Date(event.eventCreatedAt);
        const now = new Date();
        const diffInDays = (now - createdDate) / (1000 * 60 * 60 * 24);
        return diffInDays >= 0 && diffInDays <= 7;
    });

    return (
        <div
            className={`hub-card ${isNew ? 'hub-card-new' : ''}`}
            onClick={() => onSelectHub(hub)}
            style={{
                backgroundColor: '#ffffff',
                border: '1px solid #f0f3f9',
                padding: '24px',
                cursor: 'pointer',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '16px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                position: 'relative',
                height: '100%' // Ensure consistent height in grid
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)';
            }}
        >
            {isNew && <div className="new-badge" style={{ top: '15px', right: '15px' }}>NEW</div>}

            {/* Hub Name at Top */}
            <h3 style={{
                margin: 0,
                color: '#1e293b',
                fontSize: '1.25rem',
                fontWeight: '700',
                lineHeight: '1.4'
            }}>
                {hub.hubName}
            </h3>

            {/* Circular Logo in Center */}
            <div style={{
                width: 'clamp(80px, 15vw, 110px)',
                height: 'clamp(80px, 15vw, 110px)',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '8px 0',
                padding: '0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
                <img
                    src={`/assets/hub-logos/${hub.logo}`}
                    alt={hub.hubName}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.backgroundColor = '#f4f6fb';
                        e.target.parentNode.innerHTML = '<span style="color:#94a3b8;font-size:0.8rem">LOGO</span>';
                    }}
                />
            </div>

            {/* Description at Bottom (2 lines limit) */}
            <p style={{
                margin: 0,
                color: '#64748b',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: '450'
            }}>
                {hub.hubOverview}
            </p>
        </div>
    );
}

export default HubCard;
