import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { isPublic } from './public.decorator';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiConflictResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @isPublic()
  @Post('/signUp')
  @ApiCreatedResponse({
    description: 'User Created Sucessfuly',
  })
  @ApiConflictResponse({ status: 409, description: 'Error Creating User' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('updateUser')
  @ApiBearerAuth()
  update(@Body() updateUserDto: UpdateUserDto, @Request() { user }) {
    return this.usersService.update(user.email, updateUserDto);
  }

  @Put('updatePassword')
  @ApiBearerAuth()
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Request() { user },
  ) {
    return this.usersService.updatePassword(user.email, updatePasswordDto);
  }

  @Post('/refreshToken')
  @ApiBearerAuth()
  refreshToken(@Request() { user }) {
    return this.usersService.refreshToken(user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
