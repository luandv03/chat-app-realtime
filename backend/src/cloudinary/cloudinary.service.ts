import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {}

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    console.log(this.configService.get('CLOUD_FOLDER'));
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: this.configService.get('CLOUD_FOLDER') },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async destroyImage(public_id: string): Promise<any> {
    const destroy = await v2.uploader.destroy(public_id);
    return destroy;
  }
}
