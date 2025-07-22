import clientPromise from './mongodb';

interface LogAuditEventOptions {
  user: string;
  action: string;
  details: string;
  severity: 'low' | 'medium' | 'high';
  req?: any; // NextRequest or Request, for IP/userAgent
}

export async function logAuditEvent({ user, action, details, severity, req }: LogAuditEventOptions) {
  const client = await clientPromise;
  const db = client.db();
  const auditLogs = db.collection('audit_logs');
  const ipAddress = req?.headers?.get?.('x-forwarded-for') || req?.ip || '';
  const userAgent = req?.headers?.get?.('user-agent') || '';
  await auditLogs.insertOne({
    timestamp: new Date(),
    user,
    action,
    details,
    severity,
    ipAddress,
    userAgent,
  });
} 