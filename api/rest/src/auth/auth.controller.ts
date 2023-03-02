import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  ForgetPasswordDto,
  LoginDto,
  OtpDto,
  OtpLoginDto,
  RegisterDto,
  ResetPasswordDto,
  SocialLoginDto,
  VerifyForgetPasswordDto,
  VerifyOtpDto,
} from './dto/create-auth.dto';
import { LocalAuthGuard } from './jwt-auth/guards/local-auth.guard';
import { RefreshTokenGuard } from './jwt-auth/guards/refresh-token-auth.guard';
import { jwtAuthGuard } from './jwt-auth/guards/jwt-auth.guard';
import { CurrentUser } from './jwt-auth/decorator/user.decorator';
import { JwtPayload } from './jwt-auth/interface/jwt-payload.interface';
import { ICurrentUser } from './jwt-auth/interface/authenticated-user.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createAccount(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('token')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('jwt-refresh-token')
  refreshJwt(@Request() req) {
    return this.authService.refreshJwt(req.user);
  }

  @Post('social-login-token')
  socialLogin(@Body() socialLoginDto: SocialLoginDto) {
    return this.authService.socialLogin(socialLoginDto);
  }
  @Post('otp-login')
  otpLogin(@Body() otpLoginDto: OtpLoginDto) {
    return this.authService.otpLogin(otpLoginDto);
  }
  @Post('send-otp-code')
  sendOtpCode(@Body() otpDto: OtpDto) {
    return this.authService.sendOtpCode(otpDto);
  }
  @Post('verify-otp-code')
  verifyOtpCode(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtpCode(verifyOtpDto);
  }
  @Post('forget-password')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }
  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
  @Post('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
  @Post('logout')
  async logout(): Promise<boolean> {
    return true;
  }
  @Post('verify-forget-password-token')
  verifyForgetPassword(
    @Body() verifyForgetPasswordDto: VerifyForgetPasswordDto,
  ) {
    return this.authService.verifyForgetPasswordToken(verifyForgetPasswordDto);
  }

  @UseGuards(jwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: ICurrentUser) {
    return this.authService.me(+user.id);
  }
  @Post('add-points')
  addWalletPoints(
    @Body() addPointsDto: any,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.authService.me(+user.id);
  }
  @Post('contact-us')
  contactUs(@Body() addPointsDto: any) {
    return {
      success: true,
      message: 'Thank you for contacting us. We will get back to you soon.',
    };
  }
}
