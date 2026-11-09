import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ThreeCanvas } from '../ThreeCanvas';

/**
 * Obsidian Silver hero.
 * Intentionally displays the original PNG asset as-is: the animated mask is
 * CSS only, and does not process, retouch or reconstruct the portrait.
 */
export const HeroSection: React.FC = () => {
  const { cmsData, navigateTo, currentView } = useCMS();
  const { profile, siteSettings } = cmsData;
  if (!siteSettings.sectionsVisibility.hero) return null;

  const onInternalLink = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    event.preventDefault();
    const targetId = href.replace(/^#\/?/, '');
    const goToSection = () => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '#' + targetId);
      }
    };
    if (currentView !== 'portfolio') {
      navigateTo('portfolio');
      window.setTimeout(goToSection, 150);
    } else {
      goToSection();
    }
  };

  return (
    <section id="home" className="nexora-hero" aria-label="Portfolio introduction">
      {siteSettings.enable3D && (
        <div className="nexora-hero-3d" aria-hidden="true">
          <ThreeCanvas className="w-full h-full" />
        </div>
      )}
      <div className="nexora-hero-content">
        <div className="nexora-eyebrow">N / 001 — PERSONAL PORTFOLIO</div>
        <div className="nexora-hero-grid">
          <div className="nexora-intro">
            <div className="nexora-location">BASED IN {profile.district || 'SYDNEY'}, AUSTRALIA</div>
            <h1 className="nexora-headline">
              NOT HERE TO<br /><span>BLEND IN.</span>
            </h1>
            <p className="nexora-tagline">{profile.tagline}</p>
            <p className="nexora-description">
              I'm {profile.fullName}. I build things with brains, bold ideas, and a little bit of chaos.
            </p>
            <div className="nexora-cta-row">
              {profile.ctaButtons?.map((button, index) => (
                <a
                  key={button.id}
                  href={button.href}
                  onClick={(event) => onInternalLink(event, button.href)}
                  target={button.openNewTab ? '_blank' : undefined}
                  rel={button.openNewTab ? 'noopener noreferrer' : undefined}
                  className={'nexora-cta' + (button.variant === 'primary' ? ' primary' : '')}
                >
                  {button.label}{index === 0 && <span aria-hidden="true"> ↗</span>}
                </a>
              ))}
            </div>
          </div>
          <div className="nexora-photo-area">
            <div className="nexora-blob-shell">
              <div className="nexora-blob-outer" aria-hidden="true" />
              <div className="nexora-blob-border" aria-hidden="true" />
              <div className="nexora-photo-mask">
                <img
                  src={profile.profilePicture || '/images/nexora-portrait.png'}
                  alt={profile.fullName}
                  width="1254"
                  height="1254"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="nexora-hero-foot">
          <span>01 / BUILD LOUD</span><span>02 / THINK DIFFERENT</span><span>SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
    </section>
  );
};
