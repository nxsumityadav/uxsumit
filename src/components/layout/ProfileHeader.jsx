import React from 'react';
import { motion } from 'framer-motion';
import HoverPreview from '../common/HoverPreview';

const ProfileHeader = ({ profile, socialLinks }) => {
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
        hidden: { opacity: 0, y: 15, filter: 'blur(10px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)' }
    };

    return (
        <motion.div
            className="profile-card"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div
                className="avatar-container"
                variants={item}
                style={{ width: '56px', height: '56px', marginBottom: '16px', position: 'relative', display: 'inline-block' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div
                    style={{ width: '56px', height: '56px', borderRadius: '16px', overflow: 'hidden' }}
                    initial={{ rotate: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <img
                        src={profile?.avatar}
                        alt="Profile"
                        className="avatar"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </motion.div>
                {profile?.isOnline && (
                    <div
                        className="status-indicator"
                        style={{
                            position: 'absolute',
                            bottom: -4,
                            right: -4,
                            width: '12px',
                            height: '12px',
                            backgroundColor: '#22c55e',
                            borderRadius: '50%',
                            border: '2px solid #1a1a1a',
                            boxSizing: 'content-box'
                        }}
                    ></div>
                )}
            </motion.div>

            <motion.h1
                className="name"
                variants={item}
                style={{ fontSize: '24px', fontWeight: '500', marginBottom: '4px' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                {profile?.name}
            </motion.h1>

            <motion.p
                className="title"
                variants={item}
                style={{ color: '#6b7280', fontSize: '18px', marginBottom: '32px' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                {profile?.title}
            </motion.p>

            <motion.p
                className="bio"
                variants={item}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                {profile?.bio?.split(new RegExp(`(${profile?.company?.name}|Taiyary AI|Taiyari AI)`, 'g')).map((part, i) => {
                    if (part === profile?.company?.name) {
                        return (
                            <React.Fragment key={i}>
                                <HoverPreview imageSrc="/images/spreetail-web.png" href="https://www.spreetail.com">
                                    <span className="company">{part}</span>
                                </HoverPreview>
                                <span className="company-icon" style={{ overflow: 'hidden', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '4px', verticalAlign: 'middle', margin: '0 6px' }}>
                                    {profile?.company?.logo ? (
                                        <img src={profile.company.logo} alt={profile.company.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px', color: 'white' }}>
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M8 12h8" />
                                            <path d="M12 8v8" />
                                        </svg>
                                    )}
                                </span>
                            </React.Fragment>
                        );
                    } else if (part === 'Taiyary AI' || part === 'Taiyari AI') {
                        return (
                            <React.Fragment key={i}>
                                <HoverPreview imageSrc="/images/taiyaryai-web.png" href="https://taiyaryai.com">
                                    <span className="company">Taiyary</span>
                                </HoverPreview>
                                <span className="company-icon" style={{ overflow: 'hidden', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '4px', verticalAlign: 'middle', margin: '0 6px' }}>
                                    <img src="/images/Logo/taiyary.svg" alt="Taiyary" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </span>
                            </React.Fragment>
                        );
                    }
                    return <span key={i}>{part}</span>;
                })}
            </motion.p>

            <motion.div
                className="buttons"
                variants={item}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                <a href={socialLinks?.cal || "#"} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Get in Touch</a>
                <a href={socialLinks?.resume || "#"} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Resume</a>
            </motion.div>
        </motion.div>
    );
};

export default ProfileHeader;
