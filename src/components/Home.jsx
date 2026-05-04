import React, { useEffect, useRef } from 'react';
import { TICKER_ITEMS, MOCK_FREELANCERS, MOCK_PROJECTS } from '../data';

function Avatar({ initials, color, size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Syne', fontWeight: 700, fontSize: size * 0.35,
      color: 'var(--ink)', flexShrink: 0, border: '2px solid var(--paper)',
    }}>{initials}</div>
  );
}

function StatCard({ number, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 42px)', lineHeight: 1 }}>
        {number}
      </div>
      <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default function Home({ setPage }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('[data-delay]');
    els?.forEach(el => {
      el.style.opacity = 0;
      const delay = parseInt(el.dataset.delay);
      setTimeout(() => {
        el.style.animation = 'fadeUp 0.6s ease forwards';
      }, delay);
    });
  }, []);

  return (
    <div>
      {/* TICKER */}
      <div style={{
        background: 'var(--ink)', color: 'var(--lime)',
        padding: '10px 0', overflow: 'hidden',
        position: 'relative', marginTop: 64,
      }}>
        <div style={{
          display: 'flex', gap: 48,
          animation: 'marquee 20s linear infinite',
          width: 'max-content',
        }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ fontFamily: 'Syne', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section ref={heroRef} style={{
        maxWidth: 1200, margin: '0 auto',
        padding: 'clamp(48px, 8vw, 100px) clamp(16px, 4vw, 48px) 60px',
        position: 'relative',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: 60, right: '5%',
          width: 360, height: 360,
          background: 'radial-gradient(circle, rgba(200,241,53,0.18) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative' }}>
          <div data-delay="0" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--lime)', borderRadius: 50,
            padding: '6px 14px', marginBottom: 24,
          }}>
            <span style={{ fontSize: 12 }}>🎓</span>
            <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 12, color: 'var(--ink)' }}>
              IIT Campus Exclusive
            </span>
          </div>

          <h1 data-delay="100" style={{
            fontSize: 'clamp(36px, 7vw, 80px)',
            fontWeight: 800, letterSpacing: '-2px',
            lineHeight: 1.05, maxWidth: 800, marginBottom: 24,
          }}>
            Hire Student Talent.{' '}
            <span style={{
              background: 'var(--ink)', color: 'var(--lime)',
              padding: '2px 16px', borderRadius: 12, display: 'inline-block',
            }}>Get Paid.</span>
            {' '}Build Real Experience.
          </h1>

          <p data-delay="200" style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: 'var(--muted)',
            maxWidth: 520, lineHeight: 1.7, marginBottom: 40,
          }}>
            CampusGig connects skilled student freelancers with businesses and organizations 
            who need affordable, high-quality work — fast.
          </p>

          <div data-delay="300" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => setPage('freelancers')} style={{
              background: 'var(--ink)', color: 'var(--lime)',
              border: 'none', padding: '14px 28px', borderRadius: 50,
              fontFamily: 'Syne', fontWeight: 700, fontSize: 15,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              Browse Freelancers →
            </button>
            <button onClick={() => setPage('post')} style={{
              background: 'none', color: 'var(--ink)',
              border: '2px solid var(--ink)', padding: '14px 28px', borderRadius: 50,
              fontFamily: 'Syne', fontWeight: 700, fontSize: 15,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--tag-bg)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
            >
              Post a Project
            </button>
          </div>

          {/* Floating avatars */}
          <div data-delay="400" style={{
            display: 'flex', alignItems: 'center', gap: -8, marginTop: 40,
          }}>
            <div style={{ display: 'flex' }}>
              {MOCK_FREELANCERS.slice(0, 5).map((f, i) => (
                <div key={f.id} style={{ marginLeft: i === 0 ? 0 : -12 }}>
                  <Avatar initials={f.avatar} color={f.avatarColor} size={38} />
                </div>
              ))}
            </div>
            <span style={{ marginLeft: 16, fontSize: 13, color: 'var(--muted)' }}>
              <strong style={{ color: 'var(--ink)' }}>50+ students</strong> ready to work
            </span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: 'clamp(32px, 5vw, 56px) clamp(16px, 4vw, 48px)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 32,
        }}>
          <StatCard number="50+" label="Student Freelancers" />
          <StatCard number="₹2L+" label="Earned on Platform" />
          <StatCard number="95%" label="Client Satisfaction" />
          <StatCard number="48h" label="Avg. First Response" />
          <StatCard number="20+" label="Happy Clients" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{
        maxWidth: 1200, margin: '0 auto',
        padding: 'clamp(48px, 7vw, 90px) clamp(16px, 4vw, 48px)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-1px' }}>
            Simple. Fast. Campus-native.
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: 16 }}>
            Three steps to get started
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24,
        }}>
          {[
            { num: '01', icon: '📋', title: 'Post Your Project', desc: 'Describe what you need, set a budget, and go live in minutes.' },
            { num: '02', icon: '🎯', title: 'Match with Talent', desc: 'Browse verified student profiles or let applicants come to you.' },
            { num: '03', icon: '🚀', title: 'Get It Done', desc: 'Collaborate, deliver, and leave a review. Simple as that.' },
          ].map(step => (
            <div key={step.num} style={{
              background: 'var(--card-bg)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '32px 28px',
              position: 'relative', overflow: 'hidden',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{
                position: 'absolute', top: 20, right: 24,
                fontFamily: 'Syne', fontWeight: 800, fontSize: 48,
                color: 'var(--tag-bg)', lineHeight: 1,
              }}>{step.num}</div>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{step.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 10 }}>{step.title}</h3>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: 14 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section style={{
        background: 'var(--tag-bg)',
        padding: 'clamp(48px, 7vw, 90px) clamp(16px, 4vw, 48px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-1px' }}>
              Open Projects
            </h2>
            <button onClick={() => setPage('projects')} style={{
              background: 'none', border: '1.5px solid var(--ink)', padding: '8px 18px',
              borderRadius: 50, fontFamily: 'Syne', fontWeight: 600, fontSize: 13,
              transition: 'all 0.2s', cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--paper)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--ink)'; }}
            >View All →</button>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20,
          }}>
            {MOCK_PROJECTS.slice(0, 3).map(proj => (
              <div key={proj.id} style={{
                background: 'var(--card-bg)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: 24,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{
                    background: 'var(--lime)', color: 'var(--ink)',
                    borderRadius: 50, padding: '3px 10px',
                    fontFamily: 'Syne', fontWeight: 700, fontSize: 11,
                  }}>{proj.category}</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>{proj.postedAgo}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, lineHeight: 1.3 }}>{proj.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                  {proj.description.substring(0, 90)}...
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 18 }}>
                    ₹{proj.budget.toLocaleString()}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {proj.applicants} applicants
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        maxWidth: 1200, margin: '0 auto',
        padding: 'clamp(48px, 7vw, 90px) clamp(16px, 4vw, 48px)',
        textAlign: 'center',
      }}>
        <div style={{
          background: 'var(--ink)', borderRadius: 'var(--radius-lg)',
          padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 250, height: 250,
            background: 'rgba(200,241,53,0.12)', borderRadius: '50%',
          }} />
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 800,
            color: 'var(--paper)', letterSpacing: '-1px', marginBottom: 16,
          }}>
            Ready to start earning?
          </h2>
          <p style={{ color: 'rgba(245,242,235,0.6)', fontSize: 16, marginBottom: 36 }}>
            Join hundreds of students building their portfolio and income.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setPage('freelancers')} style={{
              background: 'var(--lime)', color: 'var(--ink)', border: 'none',
              padding: '14px 32px', borderRadius: 50,
              fontFamily: 'Syne', fontWeight: 700, fontSize: 15, cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
            >Join as Freelancer</button>
            <button onClick={() => setPage('post')} style={{
              background: 'none', color: 'var(--paper)', border: '2px solid rgba(245,242,235,0.4)',
              padding: '14px 32px', borderRadius: 50,
              fontFamily: 'Syne', fontWeight: 700, fontSize: 15, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--paper)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,242,235,0.4)'; }}
            >Hire Talent</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '28px clamp(16px, 4vw, 48px)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'Syne', fontWeight: 800 }}>Campus<span style={{ color: 'var(--lime-dark)' }}>Gig</span></span>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>MS4810 Group 12 — IIT Campus Project 2024</span>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>CE24B041, 48, 73, 76, 80, 85</span>
        </div>
      </footer>
    </div>
  );
}
