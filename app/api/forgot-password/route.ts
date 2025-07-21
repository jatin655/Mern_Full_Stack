import { sendPasswordResetEmail } from '@/lib/email';
import clientPromise from '@/lib/mongodb';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== FORGOT PASSWORD API CALLED ===');
    
    const { email } = await request.json();
    console.log('Email received:', email);

    if (!email) {
      console.log('No email provided');
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    // Check if user exists
    console.log('Checking if user exists...');
    const user = await users.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: 'If an account with that email exists, a password reset link has been sent.' },
        { status: 200 }
      );
    }

    console.log('User found:', user.email);

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
    console.log('Generated reset token:', resetToken.substring(0, 10) + '...');

    // Store reset token in database
    console.log('Storing reset token in database...');
    await users.updateOne(
      { email },
      {
        $set: {
          resetToken,
          resetTokenExpiry,
        }
      }
    );
    console.log('Reset token stored successfully');

    // Send password reset email
    console.log('=== ATTEMPTING TO SEND EMAIL ===');
    console.log('Environment check:');
    console.log('- SMTP_SERVER:', process.env.SMTP_SERVER);
    console.log('- SMTP_USER:', process.env.SMTP_USER);
    console.log('- SMTP_PASS exists:', !!process.env.SMTP_PASS);
    
    try {
      console.log('Calling sendPasswordResetEmail function...');
      const emailResult = await sendPasswordResetEmail(email, resetToken);
      console.log('Email result:', emailResult);
      
      if (emailResult.success) {
        console.log('✅ Password reset email sent successfully');
      } else {
        console.error('❌ Failed to send email:', emailResult.error);
        // Still return success to user for security
      }
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      console.error('Error details:', {
        message: emailError instanceof Error ? emailError.message : 'Unknown error',
        stack: emailError instanceof Error ? emailError.stack : undefined
      });
      // Still return success to user for security
    }

    console.log('=== FORGOT PASSWORD COMPLETED ===');
    return NextResponse.json(
      { message: 'If an account with that email exists, a password reset link has been sent.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('=== FORGOT PASSWORD ERROR ===');
    console.error('Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 