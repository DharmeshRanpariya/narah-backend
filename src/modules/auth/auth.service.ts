import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { AdminUser } from './schemas/admin-user.schema';
import { User } from './schemas/user.schema';
import { AdminLoginDto } from './dto/login.dto';
import { ConfigService } from '@src/config/config.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AdminUser.name) private adminUserModel: Model<AdminUser>,
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async adminLogin(loginDto: AdminLoginDto) {
    const admin = await this.adminUserModel.findOne({ email: loginDto.email });

    if (!admin || !(await bcrypt.compare(loginDto.password, admin.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    return { access_token: token, user: { id: admin._id, email: admin.email, name: admin.name, role: admin.role } };
  }

  async sendOtp(phone: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = new Date(Date.now() + this.configService.otpExpiryMinutes * 60 * 1000);

    let user = await this.userModel.findOne({ phone });
    if (!user) {
      user = new this.userModel({ phone, otp, otpExpiry: expiryTime });
    } else {
      user.otp = otp;
      user.otpExpiry = expiryTime;
      user.otpAttempts = 0;
    }

    await user.save();

    // TODO: Integrate SMS service (Twilio, etc.) to send actual OTP
    console.log(`📱 OTP for ${phone}: ${otp}`);

    return { message: 'OTP sent successfully', expiresIn: `${this.configService.otpExpiryMinutes} minutes` };
  }

  async verifyOtp(phone: string, otp: string) {
    const user = await this.userModel.findOne({ phone });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    if (user.otpAttempts >= this.configService.maxOtpAttempts) {
      throw new BadRequestException('Max OTP attempts exceeded');
    }

    if (user.otp !== otp) {
      user.otpAttempts += 1;
      await user.save();
      throw new BadRequestException('Invalid OTP');
    }

    user.otp = null;
    user.otpExpiry = null;
    user.otpAttempts = 0;
    user.lastLogin = new Date();
    await user.save();

    const token = this.jwtService.sign({
      id: user._id.toString(),
      phone: user.phone,
    });

    return { access_token: token, user: { id: user._id, phone: user.phone, name: user.name, email: user.email } };
  }
}
