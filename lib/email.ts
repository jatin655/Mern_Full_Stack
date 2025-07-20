import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

// Initialize SMTP transporter if credentials are available
if (process.env.MAILGUN_SMTP_USERNAME && process.env.MAILGUN_SMTP_PASSWORD) {
  transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILGUN_SMTP_USERNAME,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  try {
    console.log('=== Email Sending Debug ===');
    console.log('Email to:', email);
    console.log('Reset URL:', resetUrl);
    console.log('SMTP available:', !!transporter);
    console.log('SMTP Username exists:', !!process.env.MAILGUN_SMTP_USERNAME);
    console.log('SMTP Password exists:', !!process.env.MAILGUN_SMTP_PASSWORD);

    // Try SMTP first
    if (transporter) {
      console.log('Attempting to send via SMTP...');
      
      const mailOptions = {
        from: `MERN Tutorial <${process.env.MAILGUN_SMTP_USERNAME}>`,
        to: email,
        subject: 'Password Reset Request - MERN Tutorial',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; text-align: center; margin-bottom: 30px;">Password Reset Request</h2>
              
              <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                Hello,
              </p>
              
              <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                You requested a password reset for your MERN Tutorial account. Click the button below to reset your password:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background-color: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                  Reset Password
                </a>
              </div>
              
              <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                If the button doesn't work, you can copy and paste this link into your browser:
              </p>
              
              <p style="color: #3b82f6; word-break: break-all; margin-bottom: 20px;">
                ${resetUrl}
              </p>
              
              <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                This link will expire in 1 hour for security reasons.
              </p>
              
              <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
              </p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              
              <p style="color: #999; font-size: 12px; text-align: center;">
                This is an automated email from MERN Tutorial. Please do not reply to this email.
              </p>
            </div>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully via SMTP!');
      console.log('Message ID:', info.messageId);
      return info;
    }

    // Fallback: Console log for testing
    console.log('=== EMAIL FALLBACK (Console Log) ===');
    console.log('To:', email);
    console.log('Subject: Password Reset Request - MERN Tutorial');
    console.log('Reset URL:', resetUrl);
    console.log('=== END EMAIL ===');
    
    // Return a mock result for testing
    return {
      messageId: 'console-fallback-' + Date.now(),
      message: 'Email logged to console (SMTP not configured)'
    };

  } catch (error) {
    console.error('Email sending error:', error);
    
    // Even if SMTP fails, log to console for testing
    console.log('=== EMAIL FALLBACK (Error Case) ===');
    console.log('To:', email);
    console.log('Subject: Password Reset Request - MERN Tutorial');
    console.log('Reset URL:', resetUrl);
    console.log('=== END EMAIL ===');
    
    throw error;
  }
} 