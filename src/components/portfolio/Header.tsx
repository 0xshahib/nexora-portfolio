import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

/** The public navigation mirrors the approved Obsidian Silver preview. */
export const Header: React.FC = () => {
  const { cmsData, navigateTo, currentView } = useCMS();
  const [menuOpen, setMenuOpen] = useState(false);
  const { brandName, navItems } = cmsData.siteSettings;

  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    event.preventDefault();
    setMenuOpen(false);
    const targetId = href.replace(/^#\/?/, '');
    const scrollToTarget = () => {
      if (targetId === 'home' || !targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState(null, '', '#' + (targetId || 'home'));
    };
    if (currentView !== 'portfolio') {
      navigateTo('portfolio');
      window.setTimeout(scrollToTarget, 150);
    } else {
      scrollToTarget();
    }
  };

  return (
    <header id="site-header" className="nexora-header">
      <a id="header-brand-logo" className="nexora-brand" href="#home" onClick={(e) => handleNav(e, '#home')}>
        <span id="header-brand-text">{brandName}</span><span aria-hidden="true" className="nexora-star">✳</span>
      </a>
      <nav id="desktop-nav" className="nexora-nav" aria-label="Main navigation">
        {navItems?.map((item) => (
          <a key={item.id} href={item.href} onClick={(e) => handleNav(e, item.href)}
             target={item.openNewTab ? '_blank' : undefined}
             rel={item.openNewTab ? 'noopener noreferrer' : undefined}>{item.label}</a>
        ))}
      </nav>
      <div className="nexora-header-actions">
        <span className="nexora-online"><span aria-hidden="true">●</span> ONLINE</span>
        <button type="button" className="nexora-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={menuOpen}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="nexora-mobile-nav" aria-label="Mobile navigation">
          {navItems?.map((item) => (
            <a key={item.id} href={item.href} onClick={(e) => handleNav(e, item.href)}>{item.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
};
