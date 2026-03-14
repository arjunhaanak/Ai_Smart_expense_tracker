// Add this temporary check in server.js to help debugging
const db = require('./db/db');
db.query('SELECT COUNT(*) FROM users').then(res => {
    if (parseInt(res.rows[0].count) === 0) {
        console.log('⚠️ WARNING: No users found in database. Please register a new account on the frontend.');
    }
});

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const predictionRoutes = require('./routes/predictionRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/predict', predictionRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Smart AI Expense Tracker API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
