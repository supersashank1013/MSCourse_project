import React, { useState } from 'react';
import { MOCK_PROJECTS, CATEGORIES } from '../data';

function ProjectCard({ p, onApply }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      background: 'var(--card-bg)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', padding: '28px 24px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      transform: hovered ? 'translateY(-3px)' : '',
      boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.07)' : '',
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
        <span style={{
          background: 'var(--lime)', color: 'var(--ink)',
          borderRadius: 50, padding: '4px 12px',
          fontFamily: 'Syne', fontWeight: 700, fontSize: 11,
        }}>{p.category}</span>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{p.postedAgo}</span>
      </div>

      <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 6, lineHeight: 1.3 }}>{p.title}</h3>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4, fontWeight: 500 }}>by {p.client}</p>
      <p style={{ color: '#3a3530', fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>{p.description}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {p.skills.map(skill => (
          <span key={skill} style={{
            background: 'var(--tag-bg)', border: '1px solid var(--border)',
            borderRadius: 50, padding: '4px 12px', fontSize: 12,
          }}>{skill}</span>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <div>
            <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 22 }}>₹{p.budget.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Budget</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{p.deadline}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Deadline</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{p.applicants}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Applicants</div>
          </div>
        </div>
        <button onClick={() => onApply(p)} style={{
          background: 'var(--ink)', color: 'var(--lime)',
          border: 'none', padding: '10px 22px', borderRadius: 50,
          fontFamily: 'Syne', fontWeight: 700, fontSize: 14, cursor: 'pointer',
          transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >Apply Now</button>
      </div>
    </div>
  );
}

function ApplyModal({ project, onClose }) {
  const [sent, setSent] = useState(false);
  const [proposal, setProposal] = useState('');
  const [rate, setRate] = useState('');

  if (!project) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'fadeIn 0.2s ease',
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: 'var(--cream)', borderRadius: 'var(--radius-lg)',
        padding: '36px 32px', maxWidth: 500, width: '100%',
        boxShadow: '0 32px 80px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto',
      }}>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Application Sent!</h3>
            <p style={{ color: 'var(--muted)' }}>The client will review your proposal and get back to you.</p>
            <button onClick={onClose} style={{
              marginTop: 24, background: 'var(--ink)', color: 'var(--lime)',
              border: 'none', padding: '12px 28px', borderRadius: 50,
              fontFamily: 'Syne', fontWeight: 700, fontSize: 14, cursor: 'pointer',
            }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 19 }}>Apply for Project</h3>
              <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--muted)' }}>✕</button>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 24 }}>{project.title} — Budget: ₹{project.budget.toLocaleString()}</p>

            <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Your Proposed Rate (₹)</label>
            <input
              type="number" placeholder="e.g. 6500" value={rate}
              onChange={e => setRate(e.target.value)}
              style={{
                width: '100%', border: '1.5px solid var(--border)', borderRadius: 12,
                padding: '11px 16px', fontSize: 14, marginBottom: 16,
                background: 'var(--card-bg)', outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--ink)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />

            <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Cover Proposal</label>
            <textarea
              rows={5} value={proposal} onChange={e => setProposal(e.target.value)}
              placeholder="Explain why you're the right fit, your relevant experience, and how you'd approach this project..."
              style={{
                width: '100%', border: '1.5px solid var(--border)', borderRadius: 12,
                padding: '14px 16px', fontSize: 14, lineHeight: 1.6, resize: 'vertical',
                background: 'var(--card-bg)', outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--ink)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button
              onClick={() => setSent(true)}
              disabled={!proposal.trim() || !rate}
              style={{
                marginTop: 16, width: '100%',
                background: (proposal.trim() && rate) ? 'var(--ink)' : 'var(--border)',
                color: (proposal.trim() && rate) ? 'var(--lime)' : 'var(--muted)',
                border: 'none', padding: '14px', borderRadius: 50,
                fontFamily: 'Syne', fontWeight: 700, fontSize: 15,
                cursor: (proposal.trim() && rate) ? 'pointer' : 'default',
                transition: 'all 0.2s',
              }}
            >Submit Application</button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Projects({ setPage }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [applyTarget, setApplyTarget] = useState(null);

  const filtered = MOCK_PROJECTS
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p =>
      !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'budget-high') return b.budget - a.budget;
      if (sortBy === 'budget-low') return a.budget - b.budget;
      return 0;
    });

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      <div style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: 'clamp(36px, 5vw, 64px) clamp(16px, 4vw, 48px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: 'clamp(28px, 5vw, 52px)', letterSpacing: '-1.5px', marginBottom: 12 }}>
              Open Projects
            </h1>
            <p style={{ color: 'rgba(245,242,235,0.6)', fontSize: 16 }}>
              {MOCK_PROJECTS.length} projects looking for student talent
            </p>
          </div>
          <button onClick={() => setPage('post')} style={{
            background: 'var(--lime)', color: 'var(--ink)',
            border: 'none', padding: '12px 24px', borderRadius: 50,
            fontFamily: 'Syne', fontWeight: 700, fontSize: 14, cursor: 'pointer',
          }}>+ Post a Project</button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px clamp(16px, 4vw, 48px)' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          <input
            type="text" placeholder="Search projects, skills..." value={search}
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
            <option value="newest">Sort: Newest</option>
            <option value="budget-high">Sort: Budget ↓</option>
            <option value="budget-low">Sort: Budget ↑</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              background: activeCategory === cat ? 'var(--ink)' : 'var(--card-bg)',
              color: activeCategory === cat ? 'var(--lime)' : 'var(--ink)',
              border: '1.5px solid ' + (activeCategory === cat ? 'var(--ink)' : 'var(--border)'),
              borderRadius: 50, padding: '7px 16px',
              fontFamily: 'Syne', fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
            }}>{cat}</button>
          ))}
        </div>

        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>
          Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
            <p style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18 }}>No projects found</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>Try different filters or be the first to post!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {filtered.map(p => (
              <ProjectCard key={p.id} p={p} onApply={setApplyTarget} />
            ))}
          </div>
        )}
      </div>

      <ApplyModal project={applyTarget} onClose={() => setApplyTarget(null)} />
    </div>
  );
}
