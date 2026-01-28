import React from 'react';
import HoverPreview from '../common/HoverPreview';

const ProfileHeader = ({ profile, socialLinks }) => {
    return (
        <div className="profile-card">
            <div className="avatar-container">
                <img
                    src={profile?.avatar}
                    alt="Profile"
                    className="avatar"
                />
                {profile?.isOnline && <div className="status-indicator"></div>}
            </div>

            <h1 className="name">{profile?.name}</h1>
            <p className="title">{profile?.title}</p>

            <p className="bio">
                {profile?.bio?.split(new RegExp(`(${profile?.company?.name}|Taiyari AI)`, 'g')).map((part, i) => {
                    if (part === profile?.company?.name) {
                        return (
                            <React.Fragment key={i}>
                                <HoverPreview imageSrc="/images/spreetail-web.png" href="https://www.spreetail.com">
                                    <span className="company">{part}</span>
                                </HoverPreview>
                                <span className="company-icon" style={{ backgroundColor: profile?.company?.color, overflow: 'hidden' }}>
                                    {profile?.company?.logo ? (
                                        <img src={profile.company.logo} alt={profile.company.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M8 12h8" />
                                            <path d="M12 8v8" />
                                        </svg>
                                    )}
                                </span>
                            </React.Fragment>
                        );
                    } else if (part === 'Taiyari AI') {
                        return (
                            <React.Fragment key={i}>
                                <HoverPreview imageSrc="/images/taiyaryai-web.png" href="https://taiyaryai.com">
                                    <span className="company">Taiyary</span>
                                </HoverPreview>
                                <span className="company-icon" style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
                                    <img src="/images/Logo/taiyary.svg" alt="Taiyary" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </span>
                            </React.Fragment>
                        );
                    }
                    return <span key={i}>{part}</span>;
                })}
            </p>

            <div className="buttons">
                <a href={socialLinks?.cal || "#"} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Get in Touch</a>
                <a href={socialLinks?.resume || "#"} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Resume</a>
            </div>
        </div>
    );
};

export default ProfileHeader;
