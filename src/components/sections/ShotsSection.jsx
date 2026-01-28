import React from 'react';
import { motion } from 'framer-motion';

const ShotsSection = ({ shots }) => {
    return (
        <motion.div
            className="shots-grid"
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {shots.map((shot) => {
                const isVideo = shot.image?.toLowerCase().endsWith('.mp4');
                return (
                    <div key={shot.id} className="shot-card">
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
                                        preload="metadata"
                                    />
                                ) : (
                                    <img
                                        src={shot.image}
                                        alt={shot.title}
                                        className="media-item"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                )}
                            </div>

                            {/* Floating Tooltip (Visible on Hover) */}
                            <div className="hover-tooltip">
                                {isVideo ? `Motion design for ${shot.title}` : shot.title}
                            </div>
                        </div>
                    </div>
                );
            })}
        </motion.div>
    );
};

export default ShotsSection;
