import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { NotFoundException } from '@nestjs/common'

@Injectable()
export class UsersService {
	private users = [
		{ id: 1, name: 'Alice', role: 'ADMIN' },
		{ id: 2, name: 'Bob', role: 'EMPLOYEE' },
		{ id: 3, name: 'Charlie', role: 'INTERN' },
		{ id: 4, name: 'David', role: 'EMPLOYEE' },
		{ id: 5, name: 'Eve', role: 'INTERN' },
	]

	findAll(role?: 'INTERN' | 'EMPLOYEE' | 'ADMIN') {
		if (role) {
			const roles = ['INTERN', 'EMPLOYEE', 'ADMIN']
			const rolesArray = this.users.filter(user => user.role === role)
			if (rolesArray.length === 0) {
				throw new NotFoundException(`No users with role ${role} found`)
			}
			return rolesArray
		}
		return this.users
	}

	findAllInterns() {
		return this.users.filter(user => user.role === 'INTERN')
	}

	findOne(id: number) {
		const user = this.users.find(user => user.id === id)
		if (!user) {
			throw new NotFoundException(`User with id ${id} not found`)
		}
		return user
	}

	create(createUserDto: CreateUserDto) {
		const newUser = {
			id: this.users.length + 1,
			...createUserDto,
		}
		this.users.push(newUser)
		return newUser
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		this.users = this.users.map(user => {
			if (user.id === id) {
				return { ...user, ...updateUserDto }
			}
			return user
		})

		return this.findOne(id)
	}

	delete(id: number) {
		const removedUser = this.findOne(id)

		this.users = this.users.filter(user => user.id !== id)

		return removedUser
	}
}
