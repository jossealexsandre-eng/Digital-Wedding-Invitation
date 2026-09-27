import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { sendRsvpEmail, RsvpPayload } from './src/server/emailService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API route for sending RSVP email
app.post('/api/send-rsvp', async (req, res) => {
  try {
    const data: RsvpPayload = req.body;

    if (!data.name || !data.email) {
      return res.status(400).json({
        success: false,
        error: 'Nama dan email wajib diisi.',
      });
    }

    const result = await sendRsvpEmail(data);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('[RSVP Server Error]:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Gagal mengirim email RSVP.',
    });
  }
});

// Serve frontend build if dist folder exists
const distPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Wedding RSVP Server running on http://localhost:${PORT}`);
});
