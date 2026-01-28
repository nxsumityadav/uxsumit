import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sun, Mail, Linkedin, ArrowUpRight, Dribbble } from 'lucide-react';

const Footer = ({ profile, socialLinks, hobby, currentlyPlaying, onSeeAllPhotos, signatureImage = "/images/sign2.png" }) => {
    const personalPhotos = hobby?.photos || [];

    return (
        <footer className="footer-container">
            {/* Hobby Section */}
            <div className="footer-hobby-section">
                <p className="footer-section-label">WHEN I AM NOT WORKING</p>
                <p className="footer-hobby-description">
                    {hobby?.description}
                </p>

                <motion.div
                    className="footer-photo-grid"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                >
                    {personalPhotos.slice(0, 4).map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            className="footer-stacked-photo"
                            initial={{ rotate: photo.rotation, y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            whileHover={{ rotate: 0, scale: 1.05, zIndex: 100 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                        >
                            <img src={photo.image} alt={photo.title || "Personal photo"} />
                        </motion.div>
                    ))}
                </motion.div>

                <div className="footer-photo-meta">
                    <button className="footer-see-all" onClick={onSeeAllPhotos}>
                        <span>See all</span>
                        <ArrowUpRight size={20} strokeWidth={1.5} />
                    </button>
                    <p className="footer-camera-info">{hobby?.cameraInfo}</p>
                </div>
            </div>

            {/* Music Player Card */}
            <div className="footer-music-card">
                <div className="music-card-left">
                    <div className="music-card-artwork">
                        <img src={currentlyPlaying?.artwork} alt="Artwork" />
                    </div>
                    <div className="music-card-info">
                        <p className="music-card-title">{currentlyPlaying?.title}</p>
                        <p className="music-card-artist">{currentlyPlaying?.artist}</p>
                    </div>
                </div>
                <a href={currentlyPlaying?.link} target="_blank" rel="noopener noreferrer" className="music-card-link">
                    Listen on YT Music
                </a>
            </div>

            {/* Social Links Section */}
            <div className="footer-social-links">
                <a href={`mailto:${socialLinks?.email}`} className="footer-social-row">
                    <div className="footer-social-left">
                        <Mail size={20} strokeWidth={1.5} />
                        <span>Email</span>
                    </div>
                    <div className="footer-social-right">
                        <span>{socialLinks?.email}</span>
                        <ArrowUpRight size={20} strokeWidth={1.5} />
                    </div>
                </a>

                <a href={`https://linkedin.com${socialLinks?.linkedin}`} target="_blank" rel="noopener noreferrer" className="footer-social-row">
                    <div className="footer-social-left">
                        <Linkedin size={20} strokeWidth={1.5} />
                        <span>LinkedIn</span>
                    </div>
                    <div className="footer-social-right">
                        <span>{socialLinks?.linkedin}</span>
                        <ArrowUpRight size={20} strokeWidth={1.5} />
                    </div>
                </a>

                <a href={`https://behance.net/${socialLinks?.behance}`} target="_blank" rel="noopener noreferrer" className="footer-social-row">
                    <div className="footer-social-left">
                        <i className="fa-brands fa-behance" style={{ fontSize: '20px' }}></i>
                        <span>Behance</span>
                    </div>
                    <div className="footer-social-right">
                        <span>@{socialLinks?.behance}</span>
                        <ArrowUpRight size={20} strokeWidth={1.5} />
                    </div>
                </a>

                <a href={`https://dribbble.com/${socialLinks?.dribbble}`} target="_blank" rel="noopener noreferrer" className="footer-social-row">
                    <div className="footer-social-left">
                        <Dribbble size={20} strokeWidth={1.5} />
                        <span>Dribbble</span>
                    </div>
                    <div className="footer-social-right">
                        <span>@{socialLinks?.dribbble}</span>
                        <ArrowUpRight size={20} strokeWidth={1.5} />
                    </div>
                </a>

                <a href={`https://medium.com/${socialLinks?.medium}`} target="_blank" rel="noopener noreferrer" className="footer-social-row">
                    <div className="footer-social-left">
                        <i className="fa-brands fa-medium" style={{ fontSize: '20px' }}></i>
                        <span>Medium</span>
                    </div>
                    <div className="footer-social-right">
                        <span>{socialLinks?.medium}</span>
                        <ArrowUpRight size={20} strokeWidth={1.5} />
                    </div>
                </a>
            </div>

            {/* Signature & Name Section */}
            <div className="footer-signature-wrap">
                <motion.img
                    src={signatureImage}
                    alt="Signature"
                    className="footer-signature-img-large"
                    initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>

            {/* Bottom Meta Bar */}
            <div className="footer-bottom-bar">
                <div className="footer-meta-info">
                    <MapPin size={16} />
                    <span>{profile?.location?.toUpperCase()}</span>
                </div>
                <div className="footer-meta-info">
                    <Sun size={16} />
                    <span>{profile?.weather}</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
