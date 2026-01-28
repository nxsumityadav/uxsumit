import React, { useEffect, useRef, useState } from 'react';

const LogosCarousel = ({ heading = "Trusted by these companies", logos = [] }) => {
    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationId;
        let scrollPosition = 0;
        const speed = 0.5;

        const scroll = () => {
            if (!isHovered) {
                scrollPosition += speed;
                if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                    scrollPosition = 0;
                }
                scrollContainer.scrollLeft = scrollPosition;
            }
            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationId);
    }, [isHovered, logos]);

    // Duplicate logos for seamless loop
    const duplicatedLogos = [...logos, ...logos];

    return (
        <section className="logos-section">
            <h2 className="logos-heading">{heading}</h2>
            <div className="carousel-container">
                <div
                    className="carousel-track"
                    ref={scrollRef}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {duplicatedLogos.map((logo, index) => (
                        <div key={`${logo.id}-${index}`} className="logo-item">
                            <img
                                src={logo.image}
                                alt={logo.name}
                                className="logo-image"
                            />
                        </div>
                    ))}
                </div>
                <div className="fade-left"></div>
                <div className="fade-right"></div>
            </div>
        </section>
    );
};

export default LogosCarousel;
