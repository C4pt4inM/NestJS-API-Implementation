import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	ValidationPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get() // /users
	findAll(@Query('role') role?: 'INTERN' | 'EMPLOYEE' | 'ADMIN') {
		return this.usersService.findAll(role)
	}

	@Get(':id') // /users/:id
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.findOne(id)
	}

	@Post() // /users
	create(
		@Body(ValidationPipe)
		createUserDto: CreateUserDto,
	) {
		return this.usersService.create(createUserDto)
	}

	@Patch(':id') // /users/:id
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body(ValidationPipe)
		updateUserDto: UpdateUserDto,
	) {
		return this.usersService.update(id, updateUserDto)
	}

	@Delete(':id') // /users/:id
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.delete(id)
	}
}
