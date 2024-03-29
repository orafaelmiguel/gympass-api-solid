import { it, describe, expect } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositories'
import { UserAlreadyExistsError } from '../errors/user-already-exists-'

describe('Register Use case', () => {
    it('should be able to register', async () => {
        const usersRepository = new inMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'Test',
            email: 'test@email.com',
            password: 'password'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const usersRepository = new inMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'Test',
            email: 'test@email.com',
            password: 'password'
        })

        const isPasswordCorrectlyHashed = await compare('password', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same e-mail twice', async () => {
        const usersRepository = new inMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'test@email.com'

        await registerUseCase.execute({
            name: 'Test',
            email,
            password: 'password'
        })

        expect(() => registerUseCase.execute({
            name: 'Test',
            email,
            password: 'password'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
}) 