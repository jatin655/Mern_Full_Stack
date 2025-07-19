export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  resetToken?: string;
  resetTokenExpiry?: Date;
  provider?: string;
  providerId?: string;
} 