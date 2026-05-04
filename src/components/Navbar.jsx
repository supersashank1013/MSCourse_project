import React, { useState, useEffect } from 'react';

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const nav = [
    { label: 'Home', key: 'home' },
    { label: 'Freelancers', key: 'freelancers' },
    { label: 'Projects', key: 'projects' },
    { label: 'Post a Project', key: 'post' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(245,242,235,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      padding: '0 clamp(16px, 4vw, 48px)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo */}
        <button onClick={() => setPage('home')} style={{
          background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8
        }}>
          <div style={{
            width: 32, height: 32, background: 'var(--ink)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'var(--lime)', fontFamily: 'Syne', fontWeight: 800, fontSize: 14 }}>CG</span>
          </div>
          <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>
            Campus<span style={{ color: 'var(--lime-dark)' }}>Gig</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {nav.map(({ label, key }) => (
            <button key={key} onClick={() => setPage(key)} style={{
              background: key === 'post'
                ? 'var(--ink)'
                : page === key ? 'var(--tag-bg)' : 'none',
              color: key === 'post' ? 'var(--lime)' : 'var(--ink)',
              border: 'none',
              padding: key === 'post' ? '8px 18px' : '8px 14px',
              borderRadius: 50,
              fontFamily: 'Syne', fontWeight: 600, fontSize: 14,
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => { if (key !== 'post') e.currentTarget.style.background = 'var(--tag-bg)'; }}
              onMouseLeave={e => { if (key !== 'post' && page !== key) e.currentTarget.style.background = 'none'; }}
            >{label}</button>
          ))}
        </div>

        {/* Mobile Burger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: 'none', display: 'none', flexDirection: 'column',
          gap: 5, padding: 8, cursor: 'pointer'
        }} className="burger">
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 2,
              background: 'var(--ink)', borderRadius: 2,
              transition: 'all 0.2s',
            }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--cream)', borderTop: '1px solid var(--border)',
          padding: '12px 20px 20px',
        }}>
          {nav.map(({ label, key }) => (
            <button key={key} onClick={() => { setPage(key); setMenuOpen(false); }} style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: 'none', border: 'none',
              padding: '12px 0', fontFamily: 'Syne', fontWeight: 600,
              fontSize: 16, color: page === key ? 'var(--lime-dark)' : 'var(--ink)',
              borderBottom: '1px solid var(--border)',
            }}>{label}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .burger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
