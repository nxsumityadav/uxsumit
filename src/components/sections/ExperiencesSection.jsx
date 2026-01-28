import React from 'react';
import { motion } from 'framer-motion';

const ExperiencesSection = ({ experiences }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -20, filter: 'blur(10px)' },
        show: { opacity: 1, x: 0, filter: 'blur(0px)' }
    };

    return (
        <motion.div
            className="experiences-timeline"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {experiences.map((exp) => (
                <motion.div
                    key={exp.id}
                    className="experience-row"
                    variants={item}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="experience-period">
                        {exp.period}
                    </div>
                    <div className="experience-content">
                        <h3 className="experience-title">
                            {exp.role} at{" "}
                            <span className="experience-company-icon" style={{ backgroundColor: exp.companyColor, overflow: 'hidden' }}>
                                {exp.logo ? (
                                    <img src={exp.logo} alt={exp.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="8" />
                                    </svg>
                                )}
                            </span>
                            {" "}{exp.company}
                        </h3>
                        <p className="experience-description">{exp.description}</p>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default ExperiencesSection;
