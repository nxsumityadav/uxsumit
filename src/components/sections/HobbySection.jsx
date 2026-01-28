import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const HobbySection = ({ hobby, onSeeAllPhotos }) => {
    const personalPhotos = hobby?.photos || [];

    return (
        <section className="hobby-section">
            <p className="section-label">WHEN I AM NOT WORKING</p>
            <p className="hobby-description">
                {hobby?.description}
            </p>

            <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(5px)', scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="photo-stack">
                    {personalPhotos.map((photo) => (
                        <motion.div
                            key={photo.id}
                            className="stacked-photo"
                            initial={{ rotate: photo.rotation }}
                            whileHover={{ rotate: 0, scale: 1.1, zIndex: 100 }}
                            transition={{ duration: 0.4, ease: "backOut" }}
                        >
                            <img src={photo.image} alt="Personal photo" />
                        </motion.div>
                    ))}
                </div>

                <div className="photo-footer">
                    <button className="see-all-link" onClick={onSeeAllPhotos}>
                        See all
                        <ArrowUpRight size={24} />
                    </button>
                    <p className="camera-info">{hobby?.cameraInfo}</p>
                </div>
            </motion.div>
        </section>
    );
};

export default HobbySection;
