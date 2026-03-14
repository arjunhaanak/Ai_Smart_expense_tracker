import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { transactionAPI } from '../services/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await transactionAPI.getTransactions();
        setTransactions(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const income = new Array(12).fill(0);
    const expenses = new Array(12).fill(0);

    transactions.forEach(t => {
      const date = new Date(t.date);
      const month = date.getMonth();
      if (t.type === 'income') income[month] += parseFloat(t.amount);
      else expenses[month] += parseFloat(t.amount);
    });

    return { months, income, expenses };
  };

  const { months, income, expenses } = getMonthlyData();

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: income,
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderRadius: 8
      },
      {
        label: 'Expenses',
        data: expenses,
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderRadius: 8
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#94a3b8' } },
    },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading Analytics...</div>;

  return (
    <div>
      <Navbar />
      <div className="container" style={{ paddingTop: '40px' }}>
        <h1 style={{ marginBottom: '32px' }}>Financial Analytics</h1>
        
        <div className="glass-card" style={{ height: '500px', padding: '32px' }}>
          <h3 style={{ marginBottom: '24px' }}>Monthly Income vs Expenses</h3>
          <div style={{ height: '400px' }}>
            <Bar data={chartData} options={options} />
          </div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '32px' }}>
            <div className="glass-card">
                <h3>Financial Health</h3>
                <p style={{ color: 'var(--text-dim)', marginTop: '16px' }}>
                    Based on your recent activity, your savings rate is 
                    <span style={{ color: 'var(--success)', fontWeight: '700' }}> {Math.round((income.reduce((a,b)=>a+b,0) - expenses.reduce((a,b)=>a+b,0)) / (income.reduce((a,b)=>a+b,0) || 1) * 100)}%</span>.
                </p>
                <div style={{ marginTop: '24px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>Smart Tip:</p>
                    <p style={{ fontSize: '1rem', marginTop: '8px' }}>Your largest expense category this month was Food. Try to reduce dining out to save an additional $200.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
