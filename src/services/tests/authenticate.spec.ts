import { it, describe, expect } from 'vitest'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositories'
import { AuthenticateUseCase } from '../authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

describe('Authenticate Use case', () => {
    it('should be able to authenticate', async () => {
        const usersRepository = new inMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'Test',
            email: 'test@email.com',
            password_hash: await hash('password', 6)
        })

        const { user } = await sut.execute({
            email: 'test@email.com',
            password: 'password'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong e-mail', async () => {
        const usersRepository = new inMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        expect(() => 
            sut.execute({
                email: 'test@email.com',
                password: 'password'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const usersRepository = new inMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'Test',
            email: 'test@email.com',
            password_hash: await hash('password', 6)
        })

        expect(() =>
            sut.execute({
                email: 'test@email.com',
                password: 'passwordwrong'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
}) 