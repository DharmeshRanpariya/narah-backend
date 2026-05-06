import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get jwtSecret(): string {
    return process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  }

  get jwtExpiration(): string {
    return process.env.JWT_EXPIRATION || '24h';
  }

  get mongodbUri(): string {
    return process.env.MONGODB_URI || 'mongodb://localhost:27017/jewelry-ecommerce';
  }

  get cloudinaryCloudName(): string {
    return process.env.CLOUDINARY_CLOUD_NAME || '';
  }

  get cloudinaryApiKey(): string {
    return process.env.CLOUDINARY_API_KEY || '';
  }

  get cloudinaryApiSecret(): string {
    return process.env.CLOUDINARY_API_SECRET || '';
  }

  get port(): number {
    return parseInt(process.env.PORT || '3001', 10);
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }

  get otpExpiryMinutes(): number {
    return parseInt(process.env.OTP_EXPIRY_MINUTES || '2', 10);
  }

  get maxOtpAttempts(): number {
    return parseInt(process.env.MAX_OTP_ATTEMPTS || '3', 10);
  }
}
