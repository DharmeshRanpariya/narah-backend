import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ConfigService } from '@src/config/config.service';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.cloudinaryCloudName,
      api_key: this.configService.cloudinaryApiKey,
      api_secret: this.configService.cloudinaryApiSecret,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<{ url: string; publicId: string }> {
    const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed.',
      );
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'jewelry-ecommerce',
          resource_type: 'image',
        },
        (error, result: UploadApiResponse) => {
          if (error) {
            reject(new BadRequestException(`Cloudinary upload failed: ${error.message}`));
            return;
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        },
      );
      uploadStream.end(file.buffer);
    });
  }
}
