import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, ShieldCheck, Zap, BarChart3, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const Landing = () => {
  const heroImage = "expense_tracker_hero_1773525441308.png";

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="container" style={{ 
        paddingTop: '80px', 
        paddingBottom: '140px',
        textAlign: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Decorative Image */}
        <div style={{
          width: '100%',
          maxWidth: '800px',
          height: '400px',
          marginBottom: '60px',
          borderRadius: '32px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          border: '1px solid var(--card-border)',
          position: 'relative'
        }}>
          <img 
            src={`/src/assets/${heroImage}`} 
            alt="AI Expense Tracker" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              // Fallback if image not in assets yet
              e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200";
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50%',
            background: 'linear-gradient(to top, var(--bg-darker), transparent)'
          }}></div>
        </div>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '1000px',
          background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
          zIndex: -1,
          opacity: 0.3
        }}></div>

        <h1 style={{ fontSize: '4rem', marginBottom: '24px', lineHeight: 1.1 }} className="animate-fade-in">
          Master Your Money with <br />
          <span style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI-Powered Insights
          </span>
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 40px', lineHeight: 1.6 }} className="animate-fade-in">
          Track expenses effortlessly, visualize your spending patterns, and get AI predictions to stay ahead of your financial goals.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }} className="animate-fade-in">
          <Link to="/register" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            Start for Free <ChevronRight size={20} />
          </Link>
          <Link to="/login" className="btn-glass" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            View Demo
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container" style={{ paddingBottom: '100px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '60px' }}>Built for Modern Finance</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { 
              icon: <BrainCircuit size={32} color="white" />, 
              title: "AI Predictions", 
              desc: "Our ML model learns from your history to predict next month's spending with high accuracy.",
              color: "var(--primary)"
            },
            { 
              icon: <BarChart3 size={32} color="white" />, 
              title: "Visual Analytics", 
              desc: "Beautiful, interactive charts that make your spending habits easy to understand at a glance.",
              color: "var(--secondary)"
            },
            { 
              icon: <ShieldCheck size={32} color="white" />, 
              title: "Secure & Private", 
              desc: "Bank-level encryption and full control over your data. Your privacy is our top priority.",
              color: "var(--accent)"
            },
            { 
              icon: <Zap size={32} color="white" />, 
              title: "Real-time Updates", 
              desc: "Instant synchronization across all your platforms for a seamless expense tracking experience.",
              color: "var(--success)"
            }
          ].map((f, i) => (
            <div key={i} className="glass-card" style={{ padding: '40px' }}>
              <div style={{ 
                background: f.color, 
                width: '64px', 
                height: '64px', 
                borderRadius: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: `0 8px 16px ${f.color}40`
              }}>
                {f.icon}
              </div>
              <h3 style={{ marginBottom: '16px' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--card-border)', padding: '60px 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-dim)' }}>© 2026 SmartAI Expense Tracker. Built with React & Node.js.</p>
      </footer>
    </div>
  );
};

export default Landing;
