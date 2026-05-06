import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto/login.dto';
import { SendOtpDto, VerifyOtpDto } from './dto/otp.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  @ApiOperation({ summary: 'Admin login with email and password' })
  async adminLogin(@Body() loginDto: AdminLoginDto) {
    return this.authService.adminLogin(loginDto);
  }

  @Post('user/send-otp')
  @ApiOperation({ summary: 'Send OTP to user phone' })
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto.phone);
  }

  @Post('user/verify-otp')
  @ApiOperation({ summary: 'Verify OTP and return session token' })
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto.phone, verifyOtpDto.otp);
  }
}
