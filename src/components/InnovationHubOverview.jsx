import React from 'react';

function InnovationHubOverview({ data }) {
    if (!data) return null;

    return (
        <section className="section-padding" style={{
            background: 'linear-gradient(to bottom, #0f172a, #020617)',
            textAlign: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative'
        }}>
            <div className="container">
                <span className="animate-fade-in-up" style={{
                    color: '#38bdf8',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.2em',
                    display: 'block',
                    marginBottom: '16px',
                    textTransform: 'uppercase'
                }}>
                    ABOUT THE HUB
                </span>
                <h2 className="animate-fade-in-up" style={{
                    color: 'white',
                    marginBottom: '24px',
                }}>
                    {data.title}
                </h2>
                <div style={{
                    width: '60px',
                    height: '2px',
                    background: '#38bdf8',
                    margin: '0 auto 32px'
                }}></div>
                <p className="animate-fade-in-up-delay" style={{
                    color: '#94a3b8',
                    lineHeight: '1.8',
                    margin: 0
                }}>
                    {data.description}
                </p>
            </div>
        </section>
    );
}

export default InnovationHubOverview;
