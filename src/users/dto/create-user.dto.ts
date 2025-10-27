import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsEmail()
	email: string

	@IsEnum(['INTERN', 'EMPLOYEE', 'ADMIN'], {
		message: 'role must be INTERN, EMPLOYEE, or ADMIN',
	})
	role: 'INTERN' | 'EMPLOYEE' | 'ADMIN'
}
