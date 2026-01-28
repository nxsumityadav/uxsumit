import React from 'react';
import { motion } from 'framer-motion';

const ShotsSection = ({ shots }) => {
    // Filter shots to only show published ones if applicable
    const publishedShots = shots.filter(shot => shot.published !== false);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)' }
    };

    return (
        <motion.div
            className="shots-grid"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {publishedShots.map((shot) => {
                const isVideo = shot.image?.toLowerCase().endsWith('.mp4');
                return (
                    <motion.div
                        key={shot.id}
                        className="shot-card"
                        variants={item}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="shot-wrapper">
                            <div className="shot-media">
                                {isVideo ? (
                                    <video
                                        src={shot.image}
                                        className="media-item"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="auto"
                                    />
                                ) : (
                                    <img
                                        src={shot.image}
                                        alt={shot.title}
                                        className="media-item"
                                        loading="lazy"
                                    />
                                )}
                            </div>

                            <div className="hover-tooltip">
                                {isVideo ? `Motion design for ${shot.title}` : shot.title}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default ShotsSection;
