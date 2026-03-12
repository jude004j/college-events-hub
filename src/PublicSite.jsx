import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import HubsGrid from './components/HubsGrid';
import HubDetails from './components/HubDetails';
import InnovationHubOverview from './components/InnovationHubOverview';
import Gallery from './components/Gallery';
import MascotCTA from './components/MascotCTA';
import API_BASE_URL from './config/api';
import { siteData } from './data/dummyData';

function PublicSite() {
    const [selectedHub, setSelectedHub] = useState(null);
    const [hubs, setHubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const detailsRef = React.useRef(null);

    useEffect(() => {
        fetchHubsAndEvents();
    }, []);

    const fetchHubsAndEvents = async () => {
        try {
            const [hubsRes, eventsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/hubs`),
                fetch(`${API_BASE_URL}/api/events`)
            ]);

            if (hubsRes.ok && eventsRes.ok) {
                const hubsData = await hubsRes.json();
                const eventsData = await eventsRes.json();

                // Map events to hubs
                const hubsWithEvents = hubsData.map(hub => {
                    const logoName = `${hub.name.toLowerCase().replace(/\s+/g, '')}.png`;
                    return {
                        hubId: hub._id,
                        hubName: hub.name,
                        hubOverview: hub.description,
                        logo: logoName,
                        events: eventsData.filter(e => e.hubId?._id === hub._id || e.hubId === hub._id).map(e => ({
                            eventId: e._id,
                            eventTitle: e.title,
                            eventDescription: e.description,
                            eventDate: new Date(e.date).toLocaleDateString(),
                            mediaType: "image",
                            image: e.images?.[0] || "/assets/event-placeholder.jpeg",
                            images: e.images || [],
                            registerLink: e.registerLink,
                            eventCreatedAt: e.createdAt
                        }))
                    };
                });

                setHubs(hubsWithEvents);
            }
        } catch (err) {
            console.error('Error fetching public data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleHubSelect = (hub) => {
        setSelectedHub(hub);
        setTimeout(() => {
            detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleGoHome = () => {
        setSelectedHub(null);
    };

    return (
        <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header onGoHome={handleGoHome} headerData={siteData.header} />

            <main style={{ flex: 1 }}>
                <HeroSlider slides={siteData.heroSlides} />
                <InnovationHubOverview data={siteData.innovationHubOverview} />
                <Gallery />
                <MascotCTA />
                <section id="hubs-section" className="animate-zoom-in" style={{
                    padding: 'clamp(60px, 10vh, 120px) 20px',
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/explore-bg.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    width: '100%'
                }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h2 className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '80px', color: 'white', fontSize: '2.8rem', fontWeight: 'bold' }}>
                            {siteData.hubsTitle}
                        </h2>
                        {loading ? (
                            <div style={{ textAlign: 'center', color: 'white', padding: '50px', fontSize: '1.2rem' }}>Loading Hubs...</div>
                        ) : hubs.length > 0 ? (
                            <HubsGrid hubs={hubs} onSelectHub={handleHubSelect} />
                        ) : (
                            <div style={{ textAlign: 'center', color: 'white', padding: '50px', fontSize: '1.2rem' }}>No hubs found.</div>
                        )}
                    </div>
                </section>

                {selectedHub && (
                    <section
                        ref={detailsRef}
                        className="sub-hub-animated-bg animate-fade-in"
                        style={{
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            padding: 'clamp(40px, 8vh, 80px) 0',
                            width: '100%',
                            minHeight: '100vh',
                            position: 'relative'
                        }}
                    >
                        <HubDetails hub={selectedHub} />
                    </section>
                )}
            </main>

            <footer style={{
                textAlign: 'center',
                padding: '20px 0',
                backgroundColor: '#2c3e50',
                color: 'white',
                marginTop: 'auto'
            }}>
                <p style={{ margin: 0 }}>{siteData.footer.text}</p>
            </footer>
        </div>
    );
}

export default PublicSite;
