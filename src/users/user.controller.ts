import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./user.dto";

@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post(':id/follow/:targetUserId')
  follow(@Param('id') id: string, @Param('targetUserId') targetUserId: string) {
    return this.userService.followUser(+id, +targetUserId);
  }

  @Post(':id/unfollow/:targetUserId')
  unfollow(@Param('id') id: string, @Param('targetUserId') targetUserId: string) {
    return this.userService.unfollowUser(+id, +targetUserId);
  }

}
