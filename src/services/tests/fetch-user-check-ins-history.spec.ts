import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositorie'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-in history Use case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
    })

    it('should be able to fetch check in history', async () => {
        await checkInsRepository.create({
            gym_id: 'gym01',
            user_id: "user01"
        })

        await checkInsRepository.create({
            gym_id: 'gym02',
            user_id: "user01"
        })

        const { checkIns } = await sut.execute({
            userId: 'user01',
            page: 1
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym01' }),
            expect.objectContaining({ gym_id: 'gym02' })
        ])
    })

    it('should be able to fetch pagineted user check-in history', async () => {
        for (let i = 1; i <= 22; i++) {
            await checkInsRepository.create({
                gym_id: `gym${i}`,
                user_id: "user01"
            })
        }

        const { checkIns } = await sut.execute({
            userId: 'user01',
            page: 2
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym21' }),
            expect.objectContaining({ gym_id: 'gym22' })
        ])
    })
}) 