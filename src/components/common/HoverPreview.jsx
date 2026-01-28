import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HoverPreview = ({ children, imageSrc, href }) => {
    const [isHovered, setIsHovered] = useState(false);

    const Wrapper = href ? 'a' : 'span';
    const props = href ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "hover-preview-link"
    } : {};

    return (
        <Wrapper
            {...props}
            className="hover-preview-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                cursor: href ? 'pointer' : 'default'
            }}
        >
            {children}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10, x: "-50%" }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.9, y: 10, x: "-50%" }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{
                            position: 'absolute',
                            bottom: '120%',
                            left: '50%',
                            zIndex: 100,
                            pointerEvents: 'none',
                            width: '220px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)',
                            background: '#1a1a1a',
                        }}
                    >
                        <img src={imageSrc} alt="Preview" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </Wrapper>
    );
};

export default HoverPreview;
