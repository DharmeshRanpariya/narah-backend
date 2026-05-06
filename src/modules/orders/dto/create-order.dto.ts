import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  sessionId: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;
}

export class UpdateOrderStatusDto {
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  adminNotes: string;
}
