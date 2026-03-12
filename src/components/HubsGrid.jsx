import React from 'react';
import HubCard from './HubCard';

function HubsGrid({ hubs, onSelectHub }) {
    return (
        <div className="container hub-grid section-padding">
            {hubs.map(hub => (
                <HubCard key={hub.hubId} hub={hub} onSelectHub={onSelectHub} />
            ))}
        </div>
    );
}

export default HubsGrid;
