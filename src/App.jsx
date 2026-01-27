import React, { useState, useEffect } from 'react';
import ProfileWithLogos from './components/ProfileWithLogos';
import CapturePage from './components/CapturePage';

const defaultData = {
    version: "2.2",
    profile: {
        name: "Sumit Kumar",
        title: "Product Designer",
        bio: "currently designing at Spreetail and building Taiyari AI. Currently at Vibe crafting digital experiences.",
        avatar: "/images/sumit.png",
        isOnline: true,
        company: { name: "Spreetail", color: "#3b82f6", logo: "/images/Logo/spreetail.avif" },
        location: "Bangalore, India",
        weather: "34°C"
    },
    socialLinks: {
        email: "wrk.sumit@gmail.com",
        linkedin: "/in/nxsumityadav",
        behance: "sumitkumar196",
        dribbble: "nxsumityadav",
        medium: "@nxsumityadav",
        resume: "https://drive.google.com/file/d/1VJH37IC6r5k3ZDZ7C2qbw-Ck4HdWb1WF/view?usp=sharing",
        cal: "https://cal.com/nxsumityadav/15?overlayCalendar=true"
    },
    trustedCompanies: {
        heading: "Helping these brands grow 🤝",
        logos: [
            { id: "logo-1", name: "Adaapt", image: "/images/Logo/adaapt.avif" },
            { id: "logo-2", name: "Beckn", image: "/images/Logo/beckn-athon.avif" },
            { id: "logo-3", name: "Google", image: "/images/Logo/google.avif" },
            { id: "logo-4", name: "Kolo", image: "/images/Logo/koloapp.avif" },
            { id: "logo-5", name: "Microsoft", image: "/images/Logo/microsoft.png" },
            { id: "logo-6", name: "NUS", image: "/images/Logo/nus.png" },
            { id: "logo-7", name: "Outbox", image: "/images/Logo/outbox.avif" },
            { id: "logo-8", name: "Reachinbox", image: "/images/Logo/reachinbox.avif" },
            { id: "logo-9", name: "Spreetail", image: "/images/Logo/spreetail.avif" },
            { id: "logo-10", name: "Instead", image: "/images/Logo/instead.jpeg" }
        ]
    },
    workProjects: [

        {
            id: 2,
            slug: "m8N2x9pL4vR",
            title: "Building SaaSMetrics From Scratch in 3 Months (0 to 1)",
            image: "/images/Projects/saasmetrics-hero.png",
            readTime: "4 m",
            wordCount: 450,
            date: "1 JAN 2025",
            published: true,
            content: {
                intro: [
                    "As the product designer at SaaSMetrics, I led the design of a revolutionary SaaS analytics platform from concept to MVP launch.",
                    "This case study details our journey of transforming complex financial data into actionable insights through intuitive design."
                ],
                projectsTitle: "Case Studies I contributed to:",
                projects: [
                    { name: "SaaSMetrics Dashboard", description: "unifying data silos", image: "/images/Projects/saasmetrics-1.png" },
                    { name: "Financial Insights", description: "intuitive data visualization", image: "/images/Projects/saasmetrics-2.png" },
                    { name: "Customer Analytics", description: "tracking growth metrics", image: "/images/Projects/saasmetrics-3.png" }
                ]
            }
        },
        {
            id: 3,
            slug: "j5W3t6y8u9i",
            title: "Referral Stack: Cut Onboarding Time by 66%",
            image: "/images/Projects/referral-hero.png",
            readTime: "6 m",
            wordCount: 850,
            date: "1 JAN 2025",
            published: true,
            content: {
                intro: [
                    "Referral Stack is a SaaS platform helping startups and creators manage affiliate programs effortlessly.",
                    "We designed and shipped the product in one month, reducing onboarding time from 30 minutes to under 10."
                ],
                projectsTitle: "Key Features & Results:",
                projects: [
                    { name: "Instant Onboarding", description: "setup in <10 mins", image: "/images/Projects/referral-hero.png" },
                    { name: "Automated Payouts", description: "paypal & stripe", image: "/images/Projects/referral-hero.png" },
                    { name: "Real-time Analytics", description: "fraud detection", image: "/images/Projects/referral-hero.png" }
                ]
            }
        },
        {
            id: 4,
            slug: "p1O0k9m8n7b",
            title: "Jiraaf: Increasing Daily Active Users by 18%",
            image: "/images/Projects/jiraaf-hero.png",
            readTime: "4 m",
            wordCount: 600,
            date: "1 JAN 2023",
            published: true,
            content: {
                intro: [
                    "Digitizing the cafeteria experience for Kamal Bhai’s Kitchen to reduce wait times and boost engagement.",
                    "We achieved an 18% increase in DAU and a 50% reduction in queue wait times."
                ],
                projectsTitle: "Impact Highlights:",
                projects: [
                    { name: "Queue Management", description: "50% faster checkout", image: "/images/Projects/jiraaf-hero.png" },
                    { name: "Gamification", description: "boosted engagement", image: "/images/Projects/jiraaf-hero.png" }
                ]
            }
        }
    ],
    experiences: [
        {
            id: 1,
            company: "Spreetail",
            companyColor: "#3b82f6",
            logo: "/images/Logo/spreetail.avif",
            role: "Product Designer",
            period: "OCT 2024 — PRESENT",
            description: "Led design initiatives for multi-channel commerce platforms.",
            published: true
        },
        {
            id: 2,
            company: "Adaapt",
            companyColor: "#10b981",
            logo: "/images/Logo/adaapt.avif",
            role: "Product designer",
            period: "JUN 2023 — OCT 2024",
            description: "Designed end-to-end product experiences for internal tools.",
            published: true
        },
        {
            id: 3,
            company: "Koloapp",
            companyColor: "#f59e0b",
            logo: "/images/Logo/koloapp.avif",
            role: "Product Designer Intern",
            period: "JAN 2022 — APR 2022",
            description: "Assisted in UI/UX research and design for mobile platforms.",
            published: true
        }
    ],
    shots: [
        { id: "s1", title: "Charts Design", image: "/images/shots/charts.mp4", published: true },
        { id: "s2", title: "Mountain App", image: "/images/shots/mountain.mp4", published: true },
        { id: "s3", title: "Inview App", image: "/images/shots/inviw.mp4", published: true },
        { id: "s4", title: "Light Beam", image: "/images/shots/light_beam.mp4", published: true },
        { id: "s5", title: "SEO Strategy", image: "/images/shots/seo.gif", published: true },
        { id: "s6", title: "MacBook Air Concept", image: "/images/shots/MacBook Air - 4.png", published: true },
        { id: "s7", title: "Adaapt Dashboard", image: "/images/shots/adaapt.png", published: true },
        { id: "s8", title: "Digital Agency", image: "/images/shots/digencial.png", published: true },
        { id: "s9", title: "FitnessX App", image: "/images/shots/fitnessx.png", published: true },
        { id: "s10", title: "Ghumantu Travel", image: "/images/shots/ghumantu.png", published: true },
        { id: "s11", title: "Growzilla Brand", image: "/images/shots/growzilla.png", published: true },
        { id: "s12", title: "Nike Concept", image: "/images/shots/nike.png", published: true },
        { id: "s13", title: "Portfolio 2024", image: "/images/shots/portfolio.png", published: true },
        { id: "s14", title: "Saas Platform", image: "/images/shots/saas-2.webp", published: true },
        { id: "s15", title: "Security App", image: "/images/shots/secure.avif", published: true },
        { id: "s16", title: "Poster Design", image: "/images/shots/Poster.png", published: true },
        { id: "s17", title: "Hustler X Icons", image: "/images/shots/hustler_x_icons.png", published: true },
        { id: "s18", title: "HustlerX Platform", image: "/images/shots/hustlerx.png", published: true },
        { id: "s19", title: "HustlerX Logo", image: "/images/shots/logo_hustlerx.png", published: true },
        { id: "s20", title: "Ludo Game Design", image: "/images/shots/ludo.png", published: true },
        { id: "s21", title: "Pricing Plans", image: "/images/shots/plans.png", published: true },
        { id: "s22", title: "Supreme Concept", image: "/images/shots/supreme.jpg", published: true },
        { id: "s23", title: "Trell Agency", image: "/images/shots/trell.png", published: true },
        { id: "s24", title: "Kiyaray App", image: "/images/shots/kiyaray .webp", published: true },
        { id: "s25", title: "Microscope View", image: "/images/shots/microscop[e.jpg", published: true }
    ],
    about: {
        paragraphs: [
            "Hey, I’m Sumit a Product designer obsessed with crafting digital experiences that actually matter. My journey kicked off in the world of visual art, but I quickly got hooked on building products that solve real problems.",
            "Right now, you’ll find me at Vibe, blending code and design to help businesses build products their users love. I’ve done everything from designing end-to-end products to taking my own ideas through the YC application grind.",
            "When I’m not deep in design, I’m experimenting with my own B2B SaaS projects (some live, some resting in my ever-growing side project graveyard 🥀). Always building, always learning.",
            "Check out my latest project: <a href='https://taiyaryai.com' target='_blank' rel='noopener noreferrer' style='color: #ffffff; text-decoration: underline;'>Taiyari AI</a>"
        ]
    },
    hobby: {
        label: "WHEN I AM NOT WORKING",
        description: "I love taking photos, playing cricket and badminton, binging Modern Family, and generously feeding the algorithm my data for \"better\" ads.",
        photos: [
            { id: "h1", image: "/images/Capture/cyber.jpg", rotation: -6, title: "Cyber" },
            { id: "h2", image: "/images/Capture/delhi_bus_stop.jpg", rotation: 4, title: "Delhi Bus Stop" },
            { id: "h3", image: "/images/Capture/delhi_metro.jpg", rotation: -3, title: "Delhi Metro" },
            { id: "h4", image: "/images/Capture/india_gate.jpg", rotation: 5, title: "India Gate" },
            { id: "h5", image: "/images/Capture/night.jpg", rotation: -2, title: "Night Walk" },
            { id: "h6", image: "/images/Capture/nitj.jpg", rotation: 3, title: "NITJ Days" }
        ],
        cameraInfo: "Shot with my Pixel 6a"
    },
    currentlyPlaying: {
        title: "90s Night: Hindi",
        artist: "Melodious songs from 90s to soothe your heart and soul",
        artwork: "https://lh3.googleusercontent.com/tTY3keD6v1y_IThrZ369FkHilmEPDZE1tS6175yO1rhDkruQ5muwvAPlCafkkjarCo_T-DM1aSq1LA=w544-h544-l90-rj",
        link: "https://music.youtube.com/playlist?list=RDCLAK5uy_lbXtmLX1HAR8xjLUzI0NPfwMbj2qqMXKY&playnext=1&si=XqBlpOn5jXYAgEpR"
    }
};

const App = () => {
    const [data, setData] = useState(defaultData);
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
                <ProfileWithLogos
                    data={data}
                    onSeeAllPhotos={() => navigateTo('capture')}
                    initialSlug={activeSlug}
                    onNavigate={(v, s) => navigateTo(v, s)}
                />
            ) : (
                <CapturePage
                    photos={data.hobby?.photos || []}
                    onBack={() => navigateTo('portfolio')}
                />
            )}
        </div>
    );
};

export default App;
