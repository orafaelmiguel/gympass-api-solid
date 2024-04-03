import { it, describe, expect, beforeEach } from 'vitest'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositories'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from '../get-user-profile'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let usersRepository: inMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use case', () => {
    beforeEach(() => {
        usersRepository = new inMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'Test',
            email: 'test@email.com',
            password_hash: await hash('password', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual('Test')
    })

    it('should not be able to get user profile with wrong ID', async () => {
        expect(() => 
            sut.execute({
                userId: 'non-existing-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

}) 