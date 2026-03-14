const { exec } = require('child_process');
const path = require('path');
const db = require('../db/db');

exports.generatePrediction = async (req, res) => {
  const userId = req.user.id;
  
  // Get current month number (1-12)
  const nextMonth = (new Date().getMonth() + 2) % 12 || 12;

  // Paths
  const predictScript = path.join(__dirname, '../../ai-model/predict.py');
  
  exec(`python "${predictScript}" ${nextMonth}`, async (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing script: ${err}`);
      return res.status(500).json({ error: 'AI Prediction failed' });
    }

    const predictedSpending = parseFloat(stdout.trim());
    
    try {
      // Store prediction in DB
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const monthName = monthNames[nextMonth - 1];

      const result = await db.query(
        'INSERT INTO predictions (user_id, predicted_spending, month) VALUES ($1, $2, $3) RETURNING *',
        [userId, predictedSpending, monthName]
      );

      res.json(result.rows[0]);
    } catch (dbErr) {
      console.error(dbErr);
      res.status(500).json({ error: 'Failed to store prediction' });
    }
  });
};

exports.getLatestPrediction = async (req, res) => {
    const userId = req.user.id;
    try {
      const result = await db.query(
        'SELECT * FROM predictions WHERE user_id = $1 ORDER BY id DESC LIMIT 1',
        [userId]
      );
      res.json(result.rows[0] || { predicted_spending: 0, month: 'None' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
