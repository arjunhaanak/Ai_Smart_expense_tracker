import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

const ExpenseForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Income', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(2, 6, 23, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      <form className="glass-card animate-fade-in" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '450px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h3>Add New Transaction</h3>
          <X size={24} onClick={onClose} style={{ cursor: 'pointer', color: 'var(--text-dim)' }} />
        </div>

        <div className="grid">
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)' }}>Amount ($)</label>
            <input 
              type="number" 
              required 
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              placeholder="0.00"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)' }}>Type</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                type="button"
                onClick={() => setFormData({...formData, type: 'expense'})}
                className={formData.type === 'expense' ? 'btn-primary' : 'btn-glass'}
                style={{ flex: 1, padding: '10px' }}
              >
                Expense
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, type: 'income', category: 'Income'})}
                className={formData.type === 'income' ? 'btn-primary' : 'btn-glass'}
                style={{ flex: 1, padding: '10px' }}
              >
                Income
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)' }}>Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)' }}>Date</label>
            <input 
              type="date" 
              required
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '12px', width: '100%' }}>
            <PlusCircle size={20} /> Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
