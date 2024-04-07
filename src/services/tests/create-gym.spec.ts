import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { CreateGymUseCase } from '../create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym Use case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })

    it('should be able to create a gym', async () => {
        const { gym } = await sut.execute({
            title: 'gym-01',
            latitude: 0,
            longitude: 0,
            phone: null,
            description: null
        })

        expect(gym.id).toEqual(expect.any(String))

    })
}) 