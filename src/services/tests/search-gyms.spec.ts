import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { SearchGymsUseCase } from '../search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })

    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            title: 'academy1',
            latitude: 0,
            longitude: 0,
            phone: null,
            description: null
        })

        await gymsRepository.create({
            title: 'academy2',
            latitude: 0,
            longitude: 0,
            phone: null,
            description: null
        })


        const { gyms } = await sut.execute({
            query: 'academy1',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'academy1' })
        ])
    })

    it('should be able to fetch pagineted gyms search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `academy${i}`,
                latitude: 0,
                longitude: 0,
                phone: null,
                description: null
            })
        }

        const { gyms } = await sut.execute({
            query: 'academy',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'academy21' }),
            expect.objectContaining({ title: 'academy22' })
        ])
    })
}) 