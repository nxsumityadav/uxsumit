import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const WorkSection = ({ projects, onNavigate }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)' }
    };

    return (
        <motion.div
            className="projects-grid"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {projects.map((project) => (
                <motion.div
                    key={project.id}
                    className="project-card"
                    variants={item}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => onNavigate('work', project.slug)}
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
                        {project.readTime && (
                            <div className="project-read-time">
                                <Clock size={16} />
                                <span>{project.readTime}</span>
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default WorkSection;
