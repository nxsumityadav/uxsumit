import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Dribbble, ArrowUpRight } from 'lucide-react';

const ContactSection = ({ socialLinks, currentlyPlaying }) => {
    return (
        <section className="contact-section">
            {/* Music Player */}
            <div className="music-player">
                <div className="music-artwork">
                    <img
                        src={currentlyPlaying?.artwork}
                        alt="Album artwork"
                    />
                </div>
                <div className="music-info">
                    <p className="music-title">{currentlyPlaying?.title}</p>
                    <p className="music-artist">{currentlyPlaying?.artist}</p>
                </div>
                <a href={currentlyPlaying?.link} target="_blank" rel="noopener noreferrer" className="music-link">
                    Listen on YT Music
                </a>
            </div>

            {/* Contact Links */}
            <motion.div
                className="contact-links"
                initial={{ opacity: 0, y: 20, filter: 'blur(5px)', scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <a href={`mailto:${socialLinks?.email}`} className="contact-row">
                    <div className="contact-left">
                        <Mail className="contact-icon" strokeWidth={1.5} />
                        <span>Email</span>
                    </div>
                    <div className="contact-right">
                        <span>{socialLinks?.email}</span>
                        <ArrowUpRight className="arrow-icon" strokeWidth={2} />
                    </div>
                </a>

                <a href={`https://linkedin.com${socialLinks?.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-row">
                    <div className="contact-left">
                        <Linkedin className="contact-icon" strokeWidth={1.5} />
                        <span>LinkedIn</span>
                    </div>
                    <div className="contact-right">
                        <span>{socialLinks?.linkedin}</span>
                        <ArrowUpRight className="arrow-icon" strokeWidth={2} />
                    </div>
                </a>

                <a href={`https://behance.net/${socialLinks?.behance?.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="contact-row">
                    <div className="contact-left">
                        <i className="fa-brands fa-behance contact-icon" style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}></i>
                        <span>Behance</span>
                    </div>
                    <div className="contact-right">
                        <span>{socialLinks?.behance}</span>
                        <ArrowUpRight className="arrow-icon" strokeWidth={2} />
                    </div>
                </a>

                <a href={`https://dribbble.com/${socialLinks?.dribbble}`} target="_blank" rel="noopener noreferrer" className="contact-row">
                    <div className="contact-left">
                        <Dribbble className="contact-icon" strokeWidth={1.5} />
                        <span>Dribbble</span>
                    </div>
                    <div className="contact-right">
                        <span>{socialLinks?.dribbble}</span>
                        <ArrowUpRight className="arrow-icon" strokeWidth={2} />
                    </div>
                </a>

                <a href={`https://medium.com/${socialLinks?.medium}`} target="_blank" rel="noopener noreferrer" className="contact-row">
                    <div className="contact-left">
                        <i className="fa-brands fa-medium contact-icon" style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}></i>
                        <span>Medium</span>
                    </div>
                    <div className="contact-right">
                        <span>{socialLinks?.medium}</span>
                        <ArrowUpRight className="arrow-icon" strokeWidth={2} />
                    </div>
                </a>
            </motion.div>
        </section>
    );
};

export default ContactSection;
