import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export interface RsvpPayload {
  name: string;
  email: string;
  attendance: string;
  guests: string;
  tablePreference: string;
  message?: string;
}

export function generateEmailHtml(rsvp: RsvpPayload): string {
  const isAttending = rsvp.attendance === 'attending';
  const passCode = `AN-2026-${Math.abs(rsvp.name.length * 137).toString().padStart(4, '0')}`;
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Amelia+%26+Nathaniel+Wedding+Celebration&dates=20261114T090000Z/20261114T150000Z&details=Celebrating+the+Holy+Matrimony+%26+Wedding+Reception+of+Amelia+%26+Nathaniel+at+The+Langham+Jakarta.&location=The+Langham+Jakarta,+District+8+SCBD+Lot+28,+Jl.+Jend.+Sudirman,+Senayan,+Jakarta+Selatan`;
  const mapsUrl = `https://maps.google.com/?q=The+Langham+Jakarta`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wedding Invitation RSVP Confirmation</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #FAF7F2;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #252321;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #FAF7F2;
      padding: 40px 15px;
      box-sizing: border-box;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border: 1px solid #EAE0D3;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    }
    .header-banner {
      background: linear-gradient(135deg, #252321 0%, #36322F 100%);
      padding: 40px 20px 32px;
      text-align: center;
      color: #FAF7F2;
    }
    .header-tag {
      font-size: 10px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #D8C6A8;
      margin-bottom: 12px;
      display: block;
    }
    .header-title {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 32px;
      font-weight: normal;
      letter-spacing: 1px;
      margin: 0 0 10px;
      color: #FAF7F2;
    }
    .header-subtitle {
      font-family: Georgia, 'Times New Roman', serif;
      font-style: italic;
      font-size: 14px;
      color: #B59A6A;
      margin: 0;
    }
    .content {
      padding: 36px 30px;
    }
    .salutation {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 22px;
      color: #252321;
      margin-top: 0;
      margin-bottom: 16px;
    }
    .intro-text {
      font-size: 14px;
      line-height: 1.7;
      color: #5A534E;
      margin-bottom: 28px;
    }
    .pass-card {
      background-color: #FAF7F2;
      border: 1px solid #D8C6A8;
      border-radius: 4px;
      padding: 24px;
      margin-bottom: 28px;
    }
    .pass-header {
      border-bottom: 1px solid #E5D8C3;
      padding-bottom: 14px;
      margin-bottom: 18px;
    }
    .pass-tag {
      font-size: 9px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #A38755;
      font-weight: bold;
    }
    .pass-title {
      font-family: Georgia, serif;
      font-size: 18px;
      color: #252321;
      margin: 4px 0 0;
    }
    .info-row {
      margin-bottom: 14px;
    }
    .info-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #8C7F6E;
      display: block;
      margin-bottom: 3px;
    }
    .info-value {
      font-size: 14px;
      color: #252321;
      font-weight: 500;
    }
    .btn-group {
      text-align: center;
      margin: 32px 0 20px;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      font-size: 11px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 2px;
      margin: 4px 6px;
      font-weight: 600;
    }
    .btn-primary {
      background-color: #252321;
      color: #FAF7F2 !important;
      border: 1px solid #252321;
    }
    .btn-secondary {
      background-color: #FFFFFF;
      color: #252321 !important;
      border: 1px solid #B59A6A;
    }
    .footer {
      background-color: #F7F3ED;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #EAE0D3;
      font-size: 12px;
      color: #8C7F6E;
    }
    .footer-quote {
      font-family: Georgia, serif;
      font-style: italic;
      color: #A38755;
      font-size: 14px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header-banner">
        <span class="header-tag">The Wedding Celebration</span>
        <h1 class="header-title">Amelia &amp; Nathaniel</h1>
        <p class="header-subtitle">Saturday, November 14, 2026 • The Langham Jakarta</p>
      </div>

      <div class="content">
        <h2 class="salutation">Dear ${rsvp.name},</h2>
        
        ${
          isAttending
            ? `<p class="intro-text">
                Thank you for your gracious RSVP. We are overjoyed to confirm your presence at our wedding celebration!
                Below are your official reservation details and digital admission pass.
               </p>

               <div class="pass-card">
                 <div class="pass-header">
                   <span class="pass-tag">Digital Admission Pass</span>
                   <h3 class="pass-title">${rsvp.name}</h3>
                 </div>

                 <table width="100%" cellpadding="0" cellspacing="0" border="0">
                   <tr>
                     <td width="50%" class="info-row" style="vertical-align: top;">
                       <span class="info-label">Status</span>
                       <span class="info-value" style="color: #2F6948;">Joyfully Attending</span>
                     </td>
                     <td width="50%" class="info-row" style="vertical-align: top;">
                       <span class="info-label">Pass Reference</span>
                       <span class="info-value" style="font-family: monospace;">${passCode}</span>
                     </td>
                   </tr>
                   <tr>
                     <td width="50%" class="info-row" style="vertical-align: top; padding-top: 10px;">
                       <span class="info-label">Total Guests</span>
                       <span class="info-value">${rsvp.guests} Person(s)</span>
                     </td>
                     <td width="50%" class="info-row" style="vertical-align: top; padding-top: 10px;">
                       <span class="info-label">Table Preference</span>
                       <span class="info-value">${rsvp.tablePreference || 'General Guest Seating'}</span>
                     </td>
                   </tr>
                   <tr>
                     <td colspan="2" class="info-row" style="padding-top: 14px; border-top: 1px dashed #D8C6A8;">
                       <span class="info-label">Venue &amp; Schedule</span>
                       <span class="info-value">
                         <strong>Holy Matrimony:</strong> 16:00 WIB<br>
                         <strong>Evening Gala Reception:</strong> 19:00 WIB<br>
                         Grand Conservatory Ballroom, The Langham Jakarta<br>
                         <span style="font-size: 12px; color: #73695F;">District 8 SCBD Lot 28, Senayan, Jakarta Selatan</span>
                       </span>
                     </td>
                   </tr>
                   ${
                     rsvp.message
                       ? `<tr>
                           <td colspan="2" class="info-row" style="padding-top: 12px;">
                             <span class="info-label">Your Note</span>
                             <span class="info-value" style="font-style: italic; color: #5A534E;">"${rsvp.message}"</span>
                           </td>
                         </tr>`
                       : ''
                   }
                 </table>
               </div>

               <div class="btn-group">
                 <a href="${calendarUrl}" class="btn btn-primary" target="_blank">Add to Google Calendar</a>
                 <a href="${mapsUrl}" class="btn btn-secondary" target="_blank">View Map &amp; Directions</a>
               </div>`
            : `<p class="intro-text">
                Thank you for letting us know. While we are saddened that you cannot join us in person, we deeply appreciate your warm wishes and thoughts from afar on our sacred day.
               </p>
               <div class="pass-card">
                 <span class="info-label">RSVP Status</span>
                 <p class="info-value" style="color: #7B3E3E; margin: 4px 0 0;">Regretfully Unable to Attend</p>
                 ${
                   rsvp.message
                     ? `<div style="margin-top: 12px; padding-top: 10px; border-top: 1px dashed #D8C6A8;">
                          <span class="info-label">Your Warm Wishes</span>
                          <p class="info-value" style="font-style: italic; color: #5A534E; margin: 4px 0 0;">"${rsvp.message}"</p>
                        </div>`
                     : ''
                 }
               </div>`
        }

        <p class="intro-text" style="margin-top: 30px; margin-bottom: 0;">
          If you have any questions or need to make adjustments to your reservation, please don't hesitate to reach out to our wedding concierge.
        </p>
      </div>

      <div class="footer">
        <p class="footer-quote">“Two lives, two hearts, joined together in friendship, united forever in love.”</p>
        <p style="margin: 0; font-weight: 500; color: #252321;">With warmest love,<br>Amelia &amp; Nathaniel</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export async function sendRsvpEmail(rsvp: RsvpPayload): Promise<{
  success: boolean;
  simulated?: boolean;
  message: string;
}> {
  dotenv.config({ override: true });
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== 'false';
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim().replace(/\s+/g, '');
  const adminEmail = (process.env.ADMIN_NOTIFICATION_EMAIL || user).trim();

  // Check if real credentials are provided
  const isConfigured =
    user &&
    pass &&
    !user.includes('your_email') &&
    !pass.includes('your_app_password');

  if (!isConfigured) {
    console.warn(
      '[RSVP Email] SMTP credentials not fully configured in .env. Running in simulation mode. Fill SMTP_USER & SMTP_PASS in .env to send real emails.'
    );
    return {
      success: true,
      simulated: true,
      message:
        'Email configuration is missing in .env. RSVP saved (simulation mode). Please configure SMTP_USER and SMTP_PASS in .env to send live emails.',
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  const emailHtml = generateEmailHtml(rsvp);
  const isAttending = rsvp.attendance === 'attending';

  // 1. Send confirmation to the guest
  await transporter.sendMail({
    from: `"Amelia & Nathaniel Wedding" <${user}>`,
    to: rsvp.email,
    subject: isAttending
      ? `Wedding Invitation Pass & Confirmation — Amelia & Nathaniel`
      : `Thank You for Your RSVP — Amelia & Nathaniel`,
    html: emailHtml,
  });

  // 2. If admin email is configured and different from guest, send notification to couple/organizer
  if (adminEmail && adminEmail.toLowerCase() !== rsvp.email.toLowerCase()) {
    try {
      await transporter.sendMail({
        from: `"Wedding RSVP Notification" <${user}>`,
        to: adminEmail,
        subject: `[New RSVP] ${rsvp.name} (${isAttending ? 'Attending - ' + rsvp.guests + ' Guest(s)' : 'Declined'})`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #A38755;">New RSVP Submission</h2>
            <p><strong>Name:</strong> ${rsvp.name}</p>
            <p><strong>Email:</strong> ${rsvp.email}</p>
            <p><strong>Attendance:</strong> ${isAttending ? 'Joyfully Attending' : 'Regretfully Unable'}</p>
            <p><strong>Number of Guests:</strong> ${rsvp.guests}</p>
            <p><strong>Table Preference:</strong> ${rsvp.tablePreference}</p>
            <p><strong>Personal Note:</strong> ${rsvp.message || '-'}</p>
          </div>
        `,
      });
    } catch (adminErr) {
      console.error('[RSVP Email] Failed to send admin notification:', adminErr);
    }
  }

  return {
    success: true,
    message: `RSVP confirmation successfully sent to ${rsvp.email}!`,
  };
}
