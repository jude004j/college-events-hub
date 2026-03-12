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
        >
            {isNew && <div className="new-badge">NEW</div>}

            {/* Hub Name at Top */}
            <h3>{hub.hubName}</h3>

            {/* Circular Logo in Center */}
            <div className="hub-card-logo-container">
                <img
                    src={`/assets/hub-logos/${hub.logo}`}
                    alt={hub.hubName}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.backgroundColor = '#f4f6fb';
                        e.target.parentNode.innerHTML = '<span style="color:#94a3b8;font-size:0.8rem">LOGO</span>';
                    }}
                />
            </div>

            {/* Description at Bottom (2 lines limit) */}
            <p>{hub.hubOverview}</p>
        </div>
    );
}

export default HubCard;
