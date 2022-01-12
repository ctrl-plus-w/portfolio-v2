import type { NextApiRequest, NextApiResponse } from 'next';

import sendgrid from '@sendgrid/mail';

if (!process.env.API_KEY) throw new Error('SendGrid api key missing. (API_KEY)');

sendgrid.setApiKey(process.env.API_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.body.message) return res.status(500).json({ error: 'Missing subject' });

    await sendgrid.send({
      to: 'lukas.ldrn@gmail.com',
      from: 'lukas.ldrn@gmail.com',
      subject: `Message reçu (site perso) `,
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Message</title>
          <meta name="author" content="Lukas Laudrain">
          <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        </head>
      
        <body>
          <div style="display: flex;justify-content: center;align-items: center;font-family: 'helvetica', 'ui-sans';">
            <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h3>You've got a new mail from ${req.body.name}, their email is: ✉️${req.body.email} </h3>
              <div style="font-size: 16px;">
                <p>Message:</p>
                <p>${req.body.message}</p>
                <br>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }

  return res.status(200).json({ message: 'Message sent' });
};

export default handler;
