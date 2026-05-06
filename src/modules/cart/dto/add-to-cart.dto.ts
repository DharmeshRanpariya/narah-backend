import { IsString, IsNumber, Min } from 'class-validator';

export class AddToCartDto {
  @IsString()
  sessionId: string;

  @IsString()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemDto {
  @IsNumber()
  @Min(1)
  quantity: number;
}
