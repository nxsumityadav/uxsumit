import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = ({ aboutData, profileImage }) => {
    return (
        <motion.div
            className="about-content"
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="about-image">
                <img
                    src={profileImage}
                    alt="About me"
                    className="about-photo"
                />
            </div>
            <div className="about-text">
                {aboutData?.paragraphs?.map((para, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
            </div>
        </motion.div>
    );
};

export default AboutSection;
