import { saasMetrics } from './case-studies/saas-metrics';
import { referralStack } from './case-studies/referral-stack';
import { jiraaf } from './case-studies/jiraaf';

export const portfolioData = {
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
        saasMetrics,
        referralStack,
        jiraaf
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
        { id: "s1", title: "Charts Design", image: "/images/Shots/charts.mp4", published: true },
        { id: "s2", title: "Mountain App", image: "/images/Shots/mountain.mp4", published: true },
        { id: "s3", title: "Inview App", image: "/images/Shots/inviw.mp4", published: true },
        { id: "s4", title: "Light Beam", image: "/images/Shots/light_beam.mp4", published: true },
        { id: "s5", title: "SEO Strategy", image: "/images/Shots/seo.gif", published: true },
        { id: "s6", title: "MacBook Air Concept", image: "/images/Shots/macbook_air.png", published: true },
        { id: "s7", title: "Adaapt Dashboard", image: "/images/Shots/adaapt.png", published: true },
        { id: "s8", title: "Digital Agency", image: "/images/Shots/digencial.png", published: true },
        { id: "s9", title: "FitnessX App", image: "/images/Shots/fitnessx.png", published: true },
        { id: "s10", title: "Ghumantu Travel", image: "/images/Shots/ghumantu.png", published: true },
        { id: "s11", title: "Growzilla Brand", image: "/images/Shots/growzilla.png", published: true },
        { id: "s12", title: "Nike Concept", image: "/images/Shots/nike.png", published: true },
        { id: "s13", title: "Portfolio 2024", image: "/images/Shots/portfolio.png", published: true },
        { id: "s14", title: "Saas Platform", image: "/images/Shots/saas-2.webp", published: true },
        { id: "s15", title: "Security App", image: "/images/Shots/secure.avif", published: true },
        { id: "s16", title: "Poster Design", image: "/images/Shots/Poster.png", published: true },
        { id: "s17", title: "Hustler X Icons", image: "/images/Shots/hustler_x_icons.png", published: true },
        { id: "s18", title: "HustlerX Platform", image: "/images/Shots/hustlerx.png", published: true },
        { id: "s19", title: "HustlerX Logo", image: "/images/Shots/logo_hustlerx.png", published: true },
        { id: "s20", title: "Ludo Game Design", image: "/images/Shots/ludo.png", published: true },
        { id: "s21", title: "Pricing Plans", image: "/images/Shots/plans.png", published: true },
        { id: "s22", title: "Supreme Concept", image: "/images/Shots/supreme.jpg", published: true },
        { id: "s23", title: "Trell Agency", image: "/images/Shots/trell.png", published: true },
        { id: "s24", title: "Kiyaray App", image: "/images/Shots/kiyaray.webp", published: true },
        { id: "s25", title: "Microscope View", image: "/images/Shots/microscope.jpg", published: true }
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
        description: "I love capturing moments through my lens, building side products, deep conversations with family, farming at home, and learning the art of feeding cows 🐄. Also, generously feeding the algorithm my data for better ads.",
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
