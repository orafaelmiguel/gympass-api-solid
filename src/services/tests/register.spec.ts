import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositories'
import { UserAlreadyExistsError } from '../errors/user-already-exists-'

let usersRepository: inMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use case', () => {
    beforeEach(() => {
        usersRepository = new inMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'Test',
            email: 'test@email.com',
            password: 'password'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'Test',
            email: 'test@email.com',
            password: 'password'
        })

        const isPasswordCorrectlyHashed = await compare('password', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same e-mail twice', async () => {
        const email = 'test@email.com'

        await sut.execute({
            name: 'Test',
            email,
            password: 'password'
        })

        await expect(() => sut.execute({
            name: 'Test',
            email,
            password: 'password'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
}) 