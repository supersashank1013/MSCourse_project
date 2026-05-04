import React, { useState } from 'react';
import { CATEGORIES, SKILLS_LIST } from '../data';

const INPUT_STYLE = {
  width: '100%', border: '1.5px solid var(--border)', borderRadius: 12,
  padding: '12px 16px', fontSize: 15, background: 'var(--card-bg)',
  outline: 'none', transition: 'border-color 0.2s', lineHeight: 1.5,
};

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ display: 'block', fontFamily: 'Syne', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{label}</label>
      {hint && <p style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 8 }}>{hint}</p>}
      {children}
    </div>
  );
}

export default function PostProject({ setPage }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '', category: '', description: '',
    skills: [], budget: '', deadline: '',
    clientName: '', clientEmail: '', clientType: '',
  });
  const [errors, setErrors] = useState({});

  const update = (key, value) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const toggleSkill = skill => {
    setForm(f => ({
      ...f,
      skills: f.skills.includes(skill)
        ? f.skills.filter(s => s !== skill)
        : [...f.skills, skill].slice(0, 5),
    }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Project title is required';
    if (!form.category) e.category = 'Please select a category';
    if (!form.description.trim() || form.description.length < 30) e.description = 'Please describe the project (min 30 chars)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.budget) e.budget = 'Budget is required';
    if (!form.deadline.trim()) e.deadline = 'Deadline is required';
    if (!form.clientName.trim()) e.clientName = 'Your name is required';
    if (!form.clientEmail.trim()) e.clientEmail = 'Email is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validateStep1()) setStep(2); };
  const handleSubmit = () => { if (validateStep2()) setSubmitted(true); };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
        <div style={{ textAlign: 'center', maxWidth: 480, animation: 'fadeUp 0.5s ease' }}>
          <div style={{
            width: 80, height: 80, background: 'var(--lime)', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, margin: '0 auto 24px',
          }}>✓</div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 32, marginBottom: 12, letterSpacing: '-1px' }}>
            Project Posted!
          </h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 12 }}>
            <strong style={{ color: 'var(--ink)' }}>"{form.title}"</strong> is now live. 
            Freelancers will be able to apply immediately.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 36 }}>
            We'll notify you at <strong>{form.clientEmail}</strong> when applications come in.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setPage('projects')} style={{
              background: 'var(--ink)', color: 'var(--lime)', border: 'none',
              padding: '13px 28px', borderRadius: 50,
              fontFamily: 'Syne', fontWeight: 700, fontSize: 15, cursor: 'pointer',
            }}>View All Projects</button>
            <button onClick={() => { setSubmitted(false); setStep(1); setForm({ title:'',category:'',description:'',skills:[],budget:'',deadline:'',clientName:'',clientEmail:'',clientType:'' }); }} style={{
              background: 'none', color: 'var(--ink)', border: '2px solid var(--ink)',
              padding: '13px 28px', borderRadius: 50,
              fontFamily: 'Syne', fontWeight: 700, fontSize: 15, cursor: 'pointer',
            }}>Post Another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      <div style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: 'clamp(36px, 5vw, 64px) clamp(16px, 4vw, 48px)',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', letterSpacing: '-1.5px', marginBottom: 12 }}>
            Post a Project
          </h1>
          <p style={{ color: 'rgba(245,242,235,0.6)', fontSize: 16 }}>
            Connect with skilled student freelancers in minutes
          </p>

          {/* Progress */}
          <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
            {[1, 2].map(s => (
              <div key={s} style={{ flex: 1, position: 'relative' }}>
                <div style={{
                  height: 4, borderRadius: 2,
                  background: step >= s ? 'var(--lime)' : 'rgba(245,242,235,0.2)',
                  transition: 'background 0.3s',
                }} />
                <span style={{
                  fontSize: 11, color: step >= s ? 'var(--lime)' : 'rgba(245,242,235,0.4)',
                  marginTop: 6, display: 'block',
                  fontFamily: 'Syne', fontWeight: 600,
                }}>
                  {s === 1 ? 'Project Details' : 'Contact & Budget'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px clamp(16px, 4vw, 48px) 80px' }}>

        {step === 1 && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <Field label="Project Title *" hint="Be specific — what exactly needs to be done?">
              <input
                type="text" value={form.title}
                onChange={e => update('title', e.target.value)}
                placeholder="e.g. Design a landing page for our startup"
                style={{ ...INPUT_STYLE, borderColor: errors.title ? '#e74c3c' : 'var(--border)' }}
                onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                onBlur={e => e.target.style.borderColor = errors.title ? '#e74c3c' : 'var(--border)'}
              />
              {errors.title && <p style={{ color: '#e74c3c', fontSize: 12, marginTop: 4 }}>{errors.title}</p>}
            </Field>

            <Field label="Category *">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <button key={cat} onClick={() => update('category', cat)} style={{
                    background: form.category === cat ? 'var(--ink)' : 'var(--card-bg)',
                    color: form.category === cat ? 'var(--lime)' : 'var(--ink)',
                    border: '1.5px solid ' + (form.category === cat ? 'var(--ink)' : 'var(--border)'),
                    borderRadius: 50, padding: '8px 18px',
                    fontFamily: 'Syne', fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
                  }}>{cat}</button>
                ))}
              </div>
              {errors.category && <p style={{ color: '#e74c3c', fontSize: 12, marginTop: 8 }}>{errors.category}</p>}
            </Field>

            <Field label="Project Description *" hint="Describe the scope, goals, and deliverables. More detail = better applicants.">
              <textarea
                rows={6} value={form.description}
                onChange={e => update('description', e.target.value)}
                placeholder="We need someone to... The project involves... Key deliverables are..."
                style={{
                  ...INPUT_STYLE,
                  resize: 'vertical', lineHeight: 1.7,
                  borderColor: errors.description ? '#e74c3c' : 'var(--border)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                onBlur={e => e.target.style.borderColor = errors.description ? '#e74c3c' : 'var(--border)'}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                {errors.description && <p style={{ color: '#e74c3c', fontSize: 12 }}>{errors.description}</p>}
                <p style={{ color: 'var(--muted)', fontSize: 12, marginLeft: 'auto' }}>{form.description.length} chars</p>
              </div>
            </Field>

            <Field label="Required Skills" hint="Select up to 5 skills (optional)">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {SKILLS_LIST.map(skill => (
                  <button key={skill} onClick={() => toggleSkill(skill)} style={{
                    background: form.skills.includes(skill) ? 'var(--lime)' : 'var(--tag-bg)',
                    color: 'var(--ink)',
                    border: '1px solid ' + (form.skills.includes(skill) ? 'var(--lime-dark)' : 'var(--border)'),
                    borderRadius: 50, padding: '5px 12px', fontSize: 12,
                    fontWeight: form.skills.includes(skill) ? 600 : 400,
                    cursor: form.skills.includes(skill) || form.skills.length < 5 ? 'pointer' : 'not-allowed',
                    opacity: !form.skills.includes(skill) && form.skills.length >= 5 ? 0.5 : 1,
                    transition: 'all 0.15s',
                  }}>{skill}</button>
                ))}
              </div>
              {form.skills.length > 0 && (
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
                  Selected: {form.skills.join(', ')}
                </p>
              )}
            </Field>

            <button onClick={handleNext} style={{
              width: '100%', background: 'var(--ink)', color: 'var(--lime)',
              border: 'none', padding: '16px', borderRadius: 50,
              fontFamily: 'Syne', fontWeight: 700, fontSize: 16, cursor: 'pointer',
              transition: 'opacity 0.2s', marginTop: 8,
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >Continue to Budget & Contact →</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <button onClick={() => setStep(1)} style={{
              background: 'none', border: 'none', color: 'var(--muted)',
              fontSize: 14, cursor: 'pointer', marginBottom: 24,
              display: 'flex', alignItems: 'center', gap: 6, padding: 0,
            }}>← Back to Project Details</button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 0 }}>
              <Field label="Budget (₹) *">
                <input
                  type="number" value={form.budget}
                  onChange={e => update('budget', e.target.value)}
                  placeholder="e.g. 5000"
                  style={{ ...INPUT_STYLE, borderColor: errors.budget ? '#e74c3c' : 'var(--border)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                  onBlur={e => e.target.style.borderColor = errors.budget ? '#e74c3c' : 'var(--border)'}
                />
                {errors.budget && <p style={{ color: '#e74c3c', fontSize: 12, marginTop: 4 }}>{errors.budget}</p>}
              </Field>

              <Field label="Deadline *" hint="">
                <input
                  type="text" value={form.deadline}
                  onChange={e => update('deadline', e.target.value)}
                  placeholder="e.g. 7 days, 2 weeks"
                  style={{ ...INPUT_STYLE, borderColor: errors.deadline ? '#e74c3c' : 'var(--border)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                  onBlur={e => e.target.style.borderColor = errors.deadline ? '#e74c3c' : 'var(--border)'}
                />
                {errors.deadline && <p style={{ color: '#e74c3c', fontSize: 12, marginTop: 4 }}>{errors.deadline}</p>}
              </Field>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28, marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 17, marginBottom: 20 }}>Your Details</h3>

              <Field label="Client Type">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Student Org', 'Small Business', 'Startup', 'Individual'].map(type => (
                    <button key={type} onClick={() => update('clientType', type)} style={{
                      background: form.clientType === type ? 'var(--ink)' : 'var(--card-bg)',
                      color: form.clientType === type ? 'var(--lime)' : 'var(--ink)',
                      border: '1.5px solid ' + (form.clientType === type ? 'var(--ink)' : 'var(--border)'),
                      borderRadius: 50, padding: '8px 16px',
                      fontFamily: 'Syne', fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'all 0.2s',
                    }}>{type}</button>
                  ))}
                </div>
              </Field>

              <Field label="Your Name *">
                <input
                  type="text" value={form.clientName}
                  onChange={e => update('clientName', e.target.value)}
                  placeholder="Full name or organisation name"
                  style={{ ...INPUT_STYLE, borderColor: errors.clientName ? '#e74c3c' : 'var(--border)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                  onBlur={e => e.target.style.borderColor = errors.clientName ? '#e74c3c' : 'var(--border)'}
                />
                {errors.clientName && <p style={{ color: '#e74c3c', fontSize: 12, marginTop: 4 }}>{errors.clientName}</p>}
              </Field>

              <Field label="Email Address *">
                <input
                  type="email" value={form.clientEmail}
                  onChange={e => update('clientEmail', e.target.value)}
                  placeholder="you@example.com"
                  style={{ ...INPUT_STYLE, borderColor: errors.clientEmail ? '#e74c3c' : 'var(--border)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                  onBlur={e => e.target.style.borderColor = errors.clientEmail ? '#e74c3c' : 'var(--border)'}
                />
                {errors.clientEmail && <p style={{ color: '#e74c3c', fontSize: 12, marginTop: 4 }}>{errors.clientEmail}</p>}
              </Field>
            </div>

            {/* Summary */}
            <div style={{
              background: 'var(--tag-bg)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '20px 22px', marginBottom: 24,
            }}>
              <h4 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Project Summary</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--muted)' }}>Title</span>
                  <span style={{ fontWeight: 600, maxWidth: '60%', textAlign: 'right' }}>{form.title || '—'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--muted)' }}>Category</span>
                  <span style={{ fontWeight: 600 }}>{form.category || '—'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--muted)' }}>Budget</span>
                  <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 16 }}>
                    {form.budget ? `₹${parseInt(form.budget).toLocaleString()}` : '—'}
                  </span>
                </div>
              </div>
            </div>

            <button onClick={handleSubmit} style={{
              width: '100%', background: 'var(--ink)', color: 'var(--lime)',
              border: 'none', padding: '16px', borderRadius: 50,
              fontFamily: 'Syne', fontWeight: 700, fontSize: 16, cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >🚀 Post Project Now</button>

            <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12, marginTop: 12 }}>
              Free to post. We'll review and publish within 1 hour.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
