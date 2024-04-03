import { it, describe, expect, beforeEach } from 'vitest'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositories'
import { AuthenticateUseCase } from '../authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let usersRepository: inMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use case', () => {
    beforeEach(() => {
        usersRepository = new inMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })

    it('should be able to authenticate', async () => {
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
        await expect(() => 
            sut.execute({
                email: 'test@email.com',
                password: 'password'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'Test',
            email: 'test@email.com',
            password_hash: await hash('password', 6)
        })

        await expect(() =>
            sut.execute({
                email: 'test@email.com',
                password: 'passwordwrong'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
}) 