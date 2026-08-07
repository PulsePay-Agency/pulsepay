import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'pulsepay-backend' });
});

// SEP-24 Webhook Receiver (Anchor triggers this when bank transfer clears)
app.post('/webhooks/sep24', (req, res) => {
  const { transaction } = req.body;
  
  if (!transaction) {
    return res.status(400).json({ error: "Missing transaction payload" });
  }

  console.log(`[Webhook] Received SEP-24 update for TX: ${transaction.id}`);
  console.log(`[Webhook] Status: ${transaction.status}`);

  if (transaction.status === 'completed') {
    console.log(`[Webhook] 💰 Deposit cleared! Amount: ${transaction.amount_in} ${transaction.asset_code}`);
    // Here we would typically index this to a DB and notify the UI via websockets
  } else if (transaction.status === 'error') {
    console.log(`[Webhook] ❌ Transaction failed: ${transaction.message}`);
  }

  res.status(200).json({ status: 'acknowledged' });
});

app.listen(port, () => {
  console.log(`[Backend] Server running on port ${port}`);
  console.log(`[Backend] Ready to receive SEP-24 webhooks from Stellar Anchors`);
});
