import React from 'react';
import { motion } from 'framer-motion';

const LogosCarousel = ({ heading = "Trusted by these companies", logos = [] }) => {
    // Duplicate logos for seamless loop
    const duplicatedLogos = [...logos, ...logos, ...logos];

    return (
        <section className="logos-section">
            <h2 className="logos-heading">{heading}</h2>
            <div className="carousel-container">
                <motion.div
                    className="carousel-track"
                    animate={{
                        x: [0, -1000],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        },
                    }}
                    style={{ display: 'flex', gap: '60px', width: 'max-content' }}
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
                </motion.div>
                <div className="fade-left"></div>
                <div className="fade-right"></div>
            </div>
        </section>
    );
};

export default LogosCarousel;
