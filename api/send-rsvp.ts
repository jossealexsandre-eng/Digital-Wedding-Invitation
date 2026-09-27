import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendRsvpEmail, RsvpPayload } from '../src/server/emailService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

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
    console.error('[RSVP Vercel API Error]:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Gagal mengirim email RSVP.',
    });
  }
}
