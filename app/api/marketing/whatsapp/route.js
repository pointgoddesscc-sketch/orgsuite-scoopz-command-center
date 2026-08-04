/**
 * ============================================================
 * Orgsuite Scoopz – Marketing WhatsApp API Route
 * Clean, production-ready, environment-variable only
 * ============================================================
 *
 * Path (Next.js App Router): app/api/marketing/whatsapp/route.js
 *
 * Security rules:
 * - Account SID and Auth Token come ONLY from process.env
 * - Never hard-code credentials
 * - Rotate Auth Token if it was ever exposed
 *
 * Required environment variables on Vercel:
 *   TWILIO_ACCOUNT_SID
 *   TWILIO_AUTH_TOKEN
 */

import twilio from 'twilio';
import { NextResponse } from 'next/server';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;

export async function POST(request) {
  try {
    if (!accountSid || !authToken) {
      return NextResponse.json(
        { error: 'Twilio credentials not configured in environment variables' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { to, variables = {} } = body;

    if (!to) {
      return NextResponse.json(
        { error: 'Missing "to" phone number (E.164 format)' },
        { status: 400 }
      );
    }

    const client = twilio(accountSid, authToken);

    const message = await client.messages.create({
      from: 'whatsapp:+14155238886',
      contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
      contentVariables: JSON.stringify(variables),
      to: `whatsapp:${to}`
    });

    return NextResponse.json({
      success: true,
      sid: message.sid,
      status: message.status,
      message: 'Marketing WhatsApp message sent via Orgsuite'
    });
  } catch (error) {
    console.error('Twilio marketing error:', error.message);
    return NextResponse.json(
      { error: 'Failed to send marketing message', details: error.message },
      { status: 500 }
    );
  }
}
