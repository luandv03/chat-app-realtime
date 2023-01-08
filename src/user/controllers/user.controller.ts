import { Controller, Req, Get, Query, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/search')
  async findUserWithSeach(
    @Req() req: Request,
    @Query('fullname') search: string,
  ): Promise<any> {
    return this.userService.findUserWithSearch(req.user, search);
  }
}
