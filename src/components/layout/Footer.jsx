import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sun } from 'lucide-react';

const Footer = ({ profile, signatureImage = "/images/sign2.png" }) => {
    return (
        <footer className="site-footer">
            <div className="footer-signature">
                <motion.img
                    src={signatureImage}
                    alt="Signature"
                    className="footer-signature-img"
                    initial={{ opacity: 0, y: 20, filter: 'blur(5px)', scale: 0.95 }}
                    whileInView={{ opacity: 0.9, y: 0, filter: 'blur(0px)', scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                />

            </div>

            <div className="footer-bottom">
                <div className="footer-location">
                    <MapPin size={18} />
                    <span>{profile?.location?.toUpperCase()}</span>
                </div>
                <div className="footer-weather">
                    <Sun size={18} />
                    <span>{profile?.weather}</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
