import React from 'react';
import { ArrowUpRight, ArrowDownRight, Percent, BrainCircuit } from 'lucide-react';

const DashboardCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Income',
      value: `$${stats.income}`,
      icon: <ArrowUpRight color="var(--success)" />,
      trend: '+12.5%',
      color: 'var(--success)'
    },
    {
      title: 'Total Expenses',
      value: `$${stats.expenses}`,
      icon: <ArrowDownRight color="var(--danger)" />,
      trend: '+4.2%',
      color: 'var(--danger)'
    },
    {
      title: 'Savings',
      value: `$${stats.savings}`,
      icon: <Percent color="var(--accent)" />,
      trend: '15.3%',
      color: 'var(--accent)'
    },
    {
      title: 'AI Prediction',
      value: `$${stats.prediction}`,
      icon: <BrainCircuit color="var(--secondary)" />,
      trend: 'Next Month',
      color: 'var(--secondary)',
      isPrediction: true
    }
  ];

  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
      {cards.map((card, index) => (
        <div key={index} className="glass-card" style={{ 
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '16px'
          }}>
            <div>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '4px' }}>{card.title}</p>
              <h2 style={{ fontSize: '1.8rem' }}>{card.value}</h2>
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.05)', 
              padding: '10px', 
              borderRadius: '12px' 
            }}>
              {card.icon}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              color: card.color, 
              fontSize: '0.85rem', 
              fontWeight: '600',
              background: `rgba(${card.color === 'var(--success)' ? '16, 185, 129' : card.color === 'var(--danger)' ? '239, 68, 68' : '168, 85, 247'}, 0.1)`,
              padding: '2px 8px',
              borderRadius: '20px'
            }}>
              {card.trend}
            </span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
              {card.isPrediction ? 'estimated spending' : 'vs last month'}
            </span>
          </div>

          {card.isPrediction && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '4px',
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
              opacity: 0.6
            }}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
