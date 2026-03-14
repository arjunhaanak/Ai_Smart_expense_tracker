import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import DashboardCards from '../components/DashboardCards';
import { ExpensePieChart, TrendLineChart } from '../components/Charts';
import ExpenseForm from '../components/ExpenseForm';
import { transactionAPI, predictionAPI } from '../services/api';
import { Plus, Brain, Trash2, Calendar, Tag, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [prediction, setPrediction] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [showAIInsights, setShowAIInsights] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // Dynamic budget from database
    const userBudget = user?.budget || 3000;

    const fetchData = async () => {
        try {
            const [transRes, predRes] = await Promise.all([
                transactionAPI.getTransactions(),
                predictionAPI.getLatest()
            ]);
            setTransactions(transRes.data);
            setPrediction(predRes.data.predicted_spending);
        } catch (err) {
            console.error('Error fetching data', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const calculateStats = () => {
        let income = 0;
        let expenses = 0;
        const categoryData = {};

        transactions.forEach(t => {
            const amt = parseFloat(t.amount);
            if (t.type === 'income') income += amt;
            else {
                expenses += amt;
                categoryData[t.category] = (categoryData[t.category] || 0) + amt;
            }
        });

        return { 
            income, 
            expenses, 
            savings: income - expenses, 
            prediction: prediction, 
            categoryData 
        };
    };

    const handleAddTransaction = async (data) => {
        try {
            await transactionAPI.addTransaction(data);
            fetchData();
        } catch (err) {
            alert('Error adding transaction');
        }
    };

    const handleDeleteTransaction = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await transactionAPI.deleteTransaction(id);
            fetchData();
        } catch (err) {
            alert('Error deleting transaction');
        }
    };

    const handleGeneratePrediction = async () => {
        try {
            const res = await predictionAPI.generate();
            setPrediction(res.data.predicted_spending);
            alert('Prediction updated using AI!');
        } catch (err) {
            alert('Error generating prediction');
        }
    };

    const stats = calculateStats();

    // Line chart data format
    const trendData = {
        labels: transactions.slice(0, 7).reverse().map(t => new Date(t.date).toLocaleDateString()),
        values: transactions.slice(0, 7).reverse().map(t => t.amount)
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading Dashboard...</div>;

    return (
        <div>
            <Navbar />
            <main className="container" style={{ paddingBottom: '60px' }}>
                <header style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    margin: '40px 0 32px' 
                }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem' }}>Your Overview</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
                            <p style={{ color: 'var(--text-dim)' }}>Live Updates • {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button className="btn-glass" onClick={() => setShowAIInsights(true)}>
                            <Brain size={20} /> AI Insight
                        </button>
                        <button className="btn-primary" onClick={() => setShowForm(true)}>
                            <Plus size={20} /> Add Expense
                        </button>
                    </div>
                </header>

                <DashboardCards stats={stats} />

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '32px' }}>
                    <div className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '1.2rem' }}>Monthly Budget</h3>
                            <span style={{ color: stats.expenses > userBudget ? 'var(--danger)' : 'var(--accent)', fontWeight: '700' }}>
                                {Math.round((stats.expenses / userBudget) * 100)}% Used
                            </span>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', height: '12px', borderRadius: '10px', overflow: 'hidden', marginBottom: '12px' }}>
                            <div style={{ 
                                background: stats.expenses > userBudget ? 'linear-gradient(90deg, var(--danger), #ff8a8a)' : 'linear-gradient(90deg, var(--primary), var(--accent))', 
                                width: `${Math.min((stats.expenses / userBudget) * 100, 100)}%`, 
                                height: '100%', 
                                borderRadius: '10px',
                                transition: 'width 1s ease-in-out'
                            }}></div>
                        </div>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>You have spent <b>${stats.expenses.toLocaleString()}</b> of your <b>${userBudget.toLocaleString()}</b> limit.</p>
                    </div>

                    <div className="glass-card" style={{ borderLeft: '4px solid var(--accent)' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '8px', borderRadius: '10px' }}>
                                <Brain size={20} color="var(--accent)" />
                            </div>
                            <h3 style={{ fontSize: '1.2rem' }}>Smart Insight</h3>
                        </div>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                            {stats.expenses > 0 ? (
                                <>
                                    Your largest expense is <span style={{ color: 'var(--danger)' }}>{Object.keys(stats.categoryData).sort((a,b) => stats.categoryData[b] - stats.categoryData[a])[0]}</span>. 
                                    Try to reduce this by 10% next week.
                                </>
                            ) : "Start adding expenses to see personalized AI insights."}
                        </p>
                    </div>

                    <div className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '8px', borderRadius: '10px' }}>
                                <TrendingUp size={20} color="var(--primary)" />
                            </div>
                            <h3 style={{ fontSize: '1.2rem' }}>Savings Goal</h3>
                        </div>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                            You can potentially save <span style={{ color: 'var(--primary)' }}>${(stats.income - stats.expenses).toLocaleString()}</span> this month based on your current pace.
                        </p>
                    </div>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', marginTop: '32px' }}>
                    <div className="glass-card" style={{ height: '400px' }}>
                        <h3 style={{ marginBottom: '24px' }}>Spending by Category</h3>
                        <div style={{ height: '300px' }}>
                            <ExpensePieChart data={stats.categoryData} />
                        </div>
                    </div>
                    <div className="glass-card" style={{ height: '400px' }}>
                        <h3 style={{ marginBottom: '24px' }}>Expense Trend (Last 7)</h3>
                        <div style={{ height: '300px' }}>
                            <TrendLineChart data={trendData} />
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div style={{ marginTop: '32px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Recent Transactions</h3>
                    <div className="glass-card" style={{ padding: '0' }}>
                        {transactions.length === 0 ? (
                            <p style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>No transactions yet.</p>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
                                        <th style={{ padding: '20px' }}>Date</th>
                                        <th style={{ padding: '20px' }}>Category</th>
                                        <th style={{ padding: '20px' }}>Type</th>
                                        <th style={{ padding: '20px' }}>Amount</th>
                                        <th style={{ padding: '20px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map(t => (
                                        <tr key={t.id} style={{ borderBottom: '1px solid var(--card-border)', transition: '0.2s' }}>
                                            <td style={{ padding: '20px', color: 'var(--text-dim)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <Calendar size={16} /> {new Date(t.date).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td style={{ padding: '20px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <Tag size={16} color="var(--primary)" /> {t.category}
                                                </div>
                                            </td>
                                            <td style={{ padding: '20px' }}>
                                                <span style={{ 
                                                    padding: '4px 10px', 
                                                    borderRadius: '20px', 
                                                    fontSize: '0.8rem',
                                                    background: t.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                    color: t.type === 'income' ? 'var(--success)' : 'var(--danger)',
                                                    textTransform: 'capitalize'
                                                }}>
                                                    {t.type}
                                                </span>
                                            </td>
                                            <td style={{ padding: '20px', fontWeight: '700' }}>
                                                {t.type === 'expense' ? '-' : '+'}${t.amount}
                                            </td>
                                            <td style={{ padding: '20px' }}>
                                                <button 
                                                    onClick={() => handleDeleteTransaction(t.id)}
                                                    style={{ background: 'transparent', color: 'var(--text-dim)' }}
                                                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--danger)'}
                                                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-dim)'}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>

            {showForm && <ExpenseForm onAdd={handleAddTransaction} onClose={() => setShowForm(false)} />}

            {/* AI Insights Modal */}
            {showAIInsights && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(2, 6, 23, 0.9)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000
                }}>
                    <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '600px', padding: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <div style={{ background: 'var(--primary)', padding: '12px', borderRadius: '16px' }}>
                                    <Brain size={32} color="white" />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.8rem' }}>AI Financial Advisor</h2>
                                    <p style={{ color: 'var(--text-dim)' }}>Personalized strategies for your wealth</p>
                                </div>
                            </div>
                            <button onClick={() => setShowAIInsights(false)} style={{ background: 'transparent', color: 'var(--text-dim)' }}>
                                <Plus size={24} style={{ transform: 'rotate(45deg)' }} />
                            </button>
                        </div>

                        <div className="grid">
                            {[
                                { title: "Reduce Overhead", desc: "You have 3 active subscriptions (Netflix, Spotify, Adobe). Canceling one could save you $15/mo.", impact: "+$180/yr", icon: <TrendingUp size={20} color="var(--primary)" /> },
                                { title: "Optimize Dining", desc: "Your weekend food spending is 40% higher than weekdays. Try meal prepping on Sundays.", impact: "+$240/mo", icon: <Tag size={20} color="var(--accent)" /> },
                                { title: "Investment Opportunity", desc: "You have an idle balance of $1,200. Consider moving it to a High-Yield Savings Account.", impact: "5.0% APY", icon: <Plus size={20} color="var(--secondary)" /> }
                            ].map((insight, i) => (
                                <div key={i} style={{ 
                                    background: 'rgba(255,255,255,0.03)', 
                                    padding: '20px', 
                                    borderRadius: '20px',
                                    border: '1px solid var(--card-border)',
                                    display: 'flex',
                                    gap: '16px'
                                }}>
                                    <div style={{ minWidth: '40px' }}>{insight.icon}</div>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <h4 style={{ fontSize: '1.1rem' }}>{insight.title}</h4>
                                            <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' }}>{insight.impact}</span>
                                        </div>
                                        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.5' }}>{insight.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="btn-primary" style={{ marginTop: '32px', width: '100%', padding: '16px' }} onClick={() => setShowAIInsights(false)}>
                            Apply Strategies
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
