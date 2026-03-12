import React from 'react';
import HubCard from './HubCard';

function HubsGrid({ hubs, onSelectHub }) {
    return (
        <div className="container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            padding: '20px 0'
        }}>
            {hubs.map(hub => (
                <HubCard key={hub.hubId} hub={hub} onSelectHub={onSelectHub} />
            ))}
        </div>
    );
}

export default HubsGrid;
