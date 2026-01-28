import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Capture from './pages/Capture';
import { portfolioData } from './data/portfolioData';

const App = () => {
    // Use imported data as initial state
    const [data, setData] = useState(portfolioData);

    const [view, setView] = useState(() => {
        const path = window.location.pathname;
        if (path === '/capture') return 'capture';
        if (path.startsWith('/work/')) return 'work';
        return 'portfolio';
    });

    const [activeSlug, setActiveSlug] = useState(() => {
        const path = window.location.pathname;
        if (path.startsWith('/work/')) return path.split('/')[2];
        return null;
    });

    // Live weather fetching
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Bangalore coordinates: 12.9716, 77.5946
                const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current_weather=true');
                const weatherData = await res.json();
                if (weatherData?.current_weather?.temperature !== undefined) {
                    const temp = Math.round(weatherData.current_weather.temperature);
                    setData(prev => ({
                        ...prev,
                        profile: {
                            ...prev.profile,
                            weather: `${temp}°C`
                        }
                    }));
                }
            } catch (err) {
                console.error("Failed to fetch weather:", err);
            }
        };

        fetchWeather();
        const interval = setInterval(fetchWeather, 15 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.pathname;
            if (path === '/capture') {
                setView('capture');
                setActiveSlug(null);
            } else if (path.startsWith('/work/')) {
                setView('work');
                setActiveSlug(path.split('/')[2]);
            } else {
                setView('portfolio');
                setActiveSlug(null);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigateTo = (newView, slug = null) => {
        let path = '/';
        if (newView === 'capture') path = '/capture';
        if (newView === 'work' && slug) path = `/work/${slug}`;

        window.history.pushState({}, '', path);
        setView(newView);
        setActiveSlug(slug);
    };

    return (
        <div className="app-root">
            {view === 'work' || view === 'portfolio' ? (
                <Home
                    data={data}
                    onSeeAllPhotos={() => navigateTo('capture')}
                    initialSlug={activeSlug}
                    onNavigate={(v, s) => navigateTo(v, s)}
                />
            ) : (
                <Capture
                    photos={data.hobby?.photos || []}
                    onBack={() => navigateTo('portfolio')}
                />
            )}
        </div>
    );
};

export default App;
