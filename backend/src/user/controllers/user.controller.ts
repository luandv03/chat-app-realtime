import {
  Controller,
  Req,
  Get,
  Query,
  UseGuards,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/search')
  async findUserWithSeach(
    @Req() req: Request,
    @Query('value') search: string,
  ): Promise<any> {
    return this.userService.findUserWithSearch(req.user, search);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadImageToCloudinary(file);
  }

  @Post('remove_image')
  removeImage(@Body('public_id') public_id: string) {
    return this.userService.destroyImageInCloudinary(public_id);
  }
}
