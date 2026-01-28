import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const WorkSection = ({ projects, onNavigate }) => {
    return (
        <motion.div
            className="projects-grid"
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {projects.map((project) => (
                <motion.div
                    key={project.id}
                    className="project-card"
                    onClick={() => onNavigate('work', project.slug)}
                    whileHover={{ y: -8, scale: 1.02, zIndex: 50, transition: { duration: 0.3 } }}
                >
                    <div className="project-thumbnail">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="thumbnail-image"
                        />
                    </div>
                    <div className="project-info">
                        <p className="project-title">{project.title}</p>
                        <div className="project-meta">
                            <Clock size={18} />
                            <span>{project.readTime}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default WorkSection;
