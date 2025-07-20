import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('=== Mailgun Environment Check ===');
    console.log('MAILGUN_API_KEY exists:', !!process.env.MAILGUN_API_KEY);
    console.log('MAILGUN_DOMAIN exists:', !!process.env.MAILGUN_DOMAIN);
    
    if (process.env.MAILGUN_API_KEY) {
      console.log('API Key starts with "key-":', process.env.MAILGUN_API_KEY.startsWith('key-'));
      console.log('API Key length:', process.env.MAILGUN_API_KEY.length);
      console.log('API Key first 10 chars:', process.env.MAILGUN_API_KEY.substring(0, 10));
    }
    
    if (process.env.MAILGUN_DOMAIN) {
      console.log('Domain contains "mailgun.org":', process.env.MAILGUN_DOMAIN.includes('mailgun.org'));
      console.log('Full domain:', process.env.MAILGUN_DOMAIN);
    }

    // Test Mailgun initialization
    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
      return NextResponse.json({
        error: 'Missing environment variables',
        MAILGUN_API_KEY: !!process.env.MAILGUN_API_KEY,
        MAILGUN_DOMAIN: !!process.env.MAILGUN_DOMAIN,
        MAILGUN_API_KEY_value: process.env.MAILGUN_API_KEY ? 'Set' : 'Not Set',
        MAILGUN_DOMAIN_value: process.env.MAILGUN_DOMAIN || 'Not Set'
      }, { status: 400 });
    }

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
    });

    // Test email sending to a real email (you can change this to your email)
    const testEmailData = {
      from: `Test <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: 'sachdevajatin906@gmail.com', // Change this to your email for testing
      subject: 'Mailgun Test Email - MERN Tutorial',
      text: 'This is a test email to verify Mailgun configuration is working.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Mailgun Test Email</h2>
          <p>This is a test email to verify that Mailgun is properly configured.</p>
          <p>If you receive this email, the email service is working correctly!</p>
          <p>Time sent: ${new Date().toISOString()}</p>
        </div>
      `
    };

    console.log('Attempting to send test email...');
    console.log('From:', testEmailData.from);
    console.log('To:', testEmailData.to);
    console.log('Subject:', testEmailData.subject);
    
    const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, testEmailData);

    console.log('Email sent successfully!');
    console.log('Message ID:', result.id);

    return NextResponse.json({
      success: true,
      message: 'Mailgun is properly configured and test email sent!',
      messageId: result.id,
      environment: {
        hasApiKey: !!process.env.MAILGUN_API_KEY,
        hasDomain: !!process.env.MAILGUN_DOMAIN,
        domain: process.env.MAILGUN_DOMAIN,
        apiKeyFormat: process.env.MAILGUN_API_KEY?.startsWith('key-') ? 'Correct' : 'Incorrect'
      },
      emailDetails: {
        from: testEmailData.from,
        to: testEmailData.to,
        subject: testEmailData.subject
      }
    });

  } catch (error: any) {
    console.error('Mailgun test error:', error);
    
    return NextResponse.json({
      error: 'Mailgun test failed',
      details: error.message,
      errorType: error.name,
      environment: {
        hasApiKey: !!process.env.MAILGUN_API_KEY,
        hasDomain: !!process.env.MAILGUN_DOMAIN,
        domain: process.env.MAILGUN_DOMAIN,
        apiKeyFormat: process.env.MAILGUN_API_KEY?.startsWith('key-') ? 'Correct' : 'Incorrect'
      }
    }, { status: 500 });
  }
} 