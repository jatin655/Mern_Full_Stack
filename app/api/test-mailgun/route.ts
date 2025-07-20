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
    }
    
    if (process.env.MAILGUN_DOMAIN) {
      console.log('Domain contains "mailgun.org":', process.env.MAILGUN_DOMAIN.includes('mailgun.org'));
    }

    // Test Mailgun initialization
    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
      return NextResponse.json({
        error: 'Missing environment variables',
        MAILGUN_API_KEY: !!process.env.MAILGUN_API_KEY,
        MAILGUN_DOMAIN: !!process.env.MAILGUN_DOMAIN
      }, { status: 400 });
    }

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
    });

    // Test email sending
    const testEmailData = {
      from: `Test <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: 'test@example.com', // This will fail but we can see the error
      subject: 'Mailgun Test Email',
      text: 'This is a test email to verify Mailgun configuration.',
    };

    console.log('Attempting to send test email...');
    const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, testEmailData);

    return NextResponse.json({
      success: true,
      message: 'Mailgun is properly configured',
      messageId: result.id,
      environment: {
        hasApiKey: !!process.env.MAILGUN_API_KEY,
        hasDomain: !!process.env.MAILGUN_DOMAIN,
        domain: process.env.MAILGUN_DOMAIN
      }
    });

  } catch (error: any) {
    console.error('Mailgun test error:', error);
    
    return NextResponse.json({
      error: 'Mailgun test failed',
      details: error.message,
      environment: {
        hasApiKey: !!process.env.MAILGUN_API_KEY,
        hasDomain: !!process.env.MAILGUN_DOMAIN,
        domain: process.env.MAILGUN_DOMAIN
      }
    }, { status: 500 });
  }
} 