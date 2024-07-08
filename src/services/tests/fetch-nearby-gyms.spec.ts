import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)
    })

    it('should be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
            title: 'Near Gym',
            latitude: -23.4636868,
            longitude: -46.2557441,
            phone: null,
            description: null
        })

        await gymsRepository.create({
            title: 'Far Gym ',
            latitude: -22.8789817,
            longitude: -43.2645787,
            phone: null,
            description: null
        })


        const { gyms } = await sut.execute({
            userLatitude: -23.4636868,
            userLongitude: -46.2557441
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Near Gym' })
        ])
    })
}) 