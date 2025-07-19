import { Resend } from 'resend';

let resend: Resend | null = null;

// Initialize Resend only if API key is available
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  try {
    if (!resend) {
      throw new Error('RESEND_API_KEY environment variable is required for email functionality');
    }

    console.log('=== Email Sending Debug ===');
    console.log('Email to:', email);
    console.log('Reset URL:', resetUrl);
    console.log('From address:', process.env.EMAIL_FROM || 'onboarding@resend.dev');

    const emailData = {
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
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

    console.log('Sending email via Resend...');
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('Resend error:', error);
      
      // Check if it's a domain verification error
      if (error.message && error.message.includes('domain is not verified')) {
        throw new Error('Domain not verified. Please verify your domain in Resend or use your own email address for testing.');
      }
      
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Email sent successfully via Resend!');
    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
} 