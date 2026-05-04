import React, { useState } from 'react';
import { MOCK_FREELANCERS, CATEGORIES, SKILLS_LIST } from '../data';

function Avatar({ initials, color, size = 52 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Syne', fontWeight: 700, fontSize: size * 0.33,
      color: 'var(--ink)', flexShrink: 0,
    }}>{initials}</div>
  );
}

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={{ color: '#f5a623', fontSize: 14 }}>★</span>
      <span style={{ fontWeight: 600, fontSize: 14 }}>{rating}</span>
    </div>
  );
}

function FreelancerCard({ f, onContact }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      background: 'var(--card-bg)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', padding: 28,
      display: 'flex', flexDirection: 'column', gap: 16,
      transition: 'transform 0.2s, box-shadow 0.2s',
      transform: hovered ? 'translateY(-4px)' : '',
      boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.08)' : '',
      cursor: 'default',
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <Avatar initials={f.avatar} color={f.avatarColor} size={52} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.2 }}>{f.name}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 13 }}>{f.rollNo}</p>
            </div>
            <StarRating rating={f.rating} />
          </div>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>{f.title}</p>
        </div>
      </div>

      <p style={{ fontSize: 14, lineHeight: 1.65, color: '#3a3530' }}>{f.bio}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {f.skills.map(skill => (
          <span key={skill} style={{
            background: 'var(--tag-bg)', border: '1px solid var(--border)',
            borderRadius: 50, padding: '4px 12px', fontSize: 12, fontWeight: 500,
          }}>{skill}</span>
        ))}
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 4,
      }}>
        <div>
          <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 20 }}>₹{f.hourlyRate}</span>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>/hr</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)', alignSelf: 'center' }}>
            {f.reviews} reviews · {f.completedProjects} projects
          </span>
          <button onClick={() => onContact(f)} style={{
            background: 'var(--ink)', color: 'var(--lime)',
            border: 'none', padding: '8px 18px', borderRadius: 50,
            fontFamily: 'Syne', fontWeight: 700, fontSize: 13, cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Contact</button>
        </div>
      </div>
    </div>
  );
}

function ContactModal({ freelancer, onClose }) {
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState('');

  if (!freelancer) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'fadeIn 0.2s ease',
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: 'var(--cream)', borderRadius: 'var(--radius-lg)',
        padding: '36px 32px', maxWidth: 460, width: '100%',
        boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
      }}>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Message Sent!</h3>
            <p style={{ color: 'var(--muted)' }}>{freelancer.name} will respond within 48 hours.</p>
            <button onClick={onClose} style={{
              marginTop: 24, background: 'var(--ink)', color: 'var(--lime)',
              border: 'none', padding: '12px 28px', borderRadius: 50,
              fontFamily: 'Syne', fontWeight: 700, fontSize: 14, cursor: 'pointer',
            }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 20 }}>Contact {freelancer.name}</h3>
              <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--muted)' }}>✕</button>
            </div>
            <textarea
              rows={5} value={msg} onChange={e => setMsg(e.target.value)}
              placeholder={`Hi ${freelancer.name}, I'm interested in working with you on...`}
              style={{
                width: '100%', border: '1.5px solid var(--border)', borderRadius: 12,
                padding: '14px 16px', fontSize: 14, lineHeight: 1.6, resize: 'vertical',
                background: 'var(--card-bg)', outline: 'none',
              }}
            />
            <button onClick={() => setSent(true)} disabled={!msg.trim()} style={{
              marginTop: 16, width: '100%',
              background: msg.trim() ? 'var(--ink)' : 'var(--border)',
              color: msg.trim() ? 'var(--lime)' : 'var(--muted)',
              border: 'none', padding: '14px', borderRadius: 50,
              fontFamily: 'Syne', fontWeight: 700, fontSize: 15, cursor: msg.trim() ? 'pointer' : 'default',
              transition: 'all 0.2s',
            }}>Send Message</button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Freelancers() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [contactTarget, setContactTarget] = useState(null);

  const filtered = MOCK_FREELANCERS
    .filter(f => activeCategory === 'All' || f.category === activeCategory)
    .filter(f =>
      !search || f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.skills.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      f.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'rate-low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'rate-high') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'projects') return b.completedProjects - a.completedProjects;
      return 0;
    });

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      {/* Header */}
      <div style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: 'clamp(36px, 5vw, 64px) clamp(16px, 4vw, 48px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(28px, 5vw, 52px)', letterSpacing: '-1.5px', marginBottom: 12 }}>
            Browse Freelancers
          </h1>
          <p style={{ color: 'rgba(245,242,235,0.6)', fontSize: 16 }}>
            {MOCK_FREELANCERS.length} verified student freelancers ready to work
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px clamp(16px, 4vw, 48px)' }}>
        {/* Search & Sort */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          <input
            type="text" placeholder="Search by name, skill..." value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: '1 1 260px', border: '1.5px solid var(--border)', borderRadius: 50,
              padding: '11px 20px', fontSize: 14, background: 'var(--card-bg)', outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--ink)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
            border: '1.5px solid var(--border)', borderRadius: 50, padding: '11px 20px',
            fontSize: 14, background: 'var(--card-bg)', outline: 'none', cursor: 'pointer',
          }}>
            <option value="rating">Sort: Top Rated</option>
            <option value="rate-low">Sort: Rate ↑</option>
            <option value="rate-high">Sort: Rate ↓</option>
            <option value="projects">Sort: Most Projects</option>
          </select>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              background: activeCategory === cat ? 'var(--ink)' : 'var(--card-bg)',
              color: activeCategory === cat ? 'var(--lime)' : 'var(--ink)',
              border: '1.5px solid ' + (activeCategory === cat ? 'var(--ink)' : 'var(--border)'),
              borderRadius: 50, padding: '7px 16px',
              fontFamily: 'Syne', fontWeight: 600, fontSize: 13, cursor: 'pointer',
              transition: 'all 0.2s',
            }}>{cat}</button>
          ))}
        </div>

        {/* Results count */}
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>
          Showing {filtered.length} freelancer{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18 }}>No freelancers found</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>Try a different search or category</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {filtered.map(f => (
              <FreelancerCard key={f.id} f={f} onContact={setContactTarget} />
            ))}
          </div>
        )}
      </div>

      <ContactModal freelancer={contactTarget} onClose={() => setContactTarget(null)} />
    </div>
  );
}
