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
  Patch,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { IProfile } from 'src/common/profile.interface';
import { IResponse } from 'src/common/response.interface';

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

  @UseGuards(JwtAuthGuard)
  @Patch('/update_profile')
  async updateProfile(
    @Req() req: Request,
    @Body() update: any,
  ): Promise<IResponse> {
    const user: IProfile = req.user as IProfile;
    return this.userService.updateProfile(user._id, update);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update_avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @Req() req: Request,
  ): Promise<any> {
    const user: IProfile = req.user as IProfile;
    return this.userService.updateAvatar(user, avatar);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:user_id')
  async getProfileUserById(
    @Param('user_id') user_id: string,
  ): Promise<IProfile> {
    return this.userService.getProfileUserById(user_id);
  }
}
