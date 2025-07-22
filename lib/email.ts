import nodemailer from 'nodemailer';

export const sendPasswordResetEmail = async (email: string, token: string) => {
  console.log('=== EMAIL FUNCTION CALLED ===');
  console.log('Email to:', email);
  console.log('Token:', token.substring(0, 10) + '...');
  
  try {
    console.log('Preparing to send password reset email...');
    console.log('SMTP_SERVER:', process.env.SMTP_SERVER);
    console.log('MAILGUN_SMTP_USERNAME:', process.env.MAILGUN_SMTP_USERNAME);
    console.log('MAILGUN_SMTP_PASSWORD exists:', !!process.env.MAILGUN_SMTP_PASSWORD);
    
    // Check if environment variables are set
    if (!process.env.SMTP_SERVER || !process.env.MAILGUN_SMTP_USERNAME || !process.env.MAILGUN_SMTP_PASSWORD) {
      console.error('❌ Missing SMTP environment variables');
      return {
        success: false,
        error: 'SMTP configuration is incomplete',
      };
    }
    
    console.log('Creating SMTP transporter...');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: 587,
      secure: false, // Mailgun uses TLS on port 587
      auth: {
        user: process.env.MAILGUN_SMTP_USERNAME,
        pass: process.env.MAILGUN_SMTP_PASSWORD,
      },
    });

    console.log('SMTP transporter created successfully');

    const resetUrl = `https://fullstack-developers-site.vercel.app/reset/${token}`;
    console.log('Reset URL:', resetUrl);
    
    const mailOptions = {
      from: 'sachdevajatin45@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Reset Password</a>
        <p>Or copy and paste this URL into your browser:</p>
        <p>${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this reset, please ignore this email.</p>
      `,
    };
    console.log('Mail options prepared:');
    console.log('- From:', mailOptions.from);
    console.log('- To:', mailOptions.to);
    console.log('- Subject:', mailOptions.subject);

    console.log('Sending email via SMTP...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.log('❌ Error occurred in sendPasswordResetEmail');
    console.error('Email sending failed:', error);
    
    if (error && typeof error === 'object') {
      console.error('Error details:');
      for (const [key, value] of Object.entries(error)) {
        console.error(`  ${key}:`, value);
      }
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}; 