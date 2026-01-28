import React from 'react';
import { motion } from 'framer-motion';

const ExperiencesSection = ({ experiences }) => {
    return (
        <motion.div
            className="experiences-timeline"
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {experiences.map((exp) => (
                <div key={exp.id} className="experience-row">
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
                </div>
            ))}
        </motion.div>
    );
};

export default ExperiencesSection;
