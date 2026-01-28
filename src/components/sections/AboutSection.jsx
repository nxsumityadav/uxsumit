import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = ({ aboutData, profileImage }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 15, filter: 'blur(10px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)' }
    };

    return (
        <motion.div
            className="about-content"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div
                className="about-image"
                variants={item}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div
                    className="about-image-wrapper"
                    whileHover={{ rotate: 0, scale: 1.05 }}
                    initial={{ rotate: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <img
                        src={profileImage}
                        alt="About me"
                        className="about-photo"
                    />
                </motion.div>
            </motion.div>
            <div className="about-text">
                {aboutData?.paragraphs?.map((para, index) => (
                    <motion.p
                        key={index}
                        variants={item}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        dangerouslySetInnerHTML={{ __html: para }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default AboutSection;
