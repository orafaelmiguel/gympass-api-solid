import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositorie'
import { GetUserMetricsUseCase } from '../get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User metrics use case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)
    })

    it('should be able to get check-ins count from metrics', async () => {
        await checkInsRepository.create({
            gym_id: 'gym01',
            user_id: "user01"
        })

        await checkInsRepository.create({
            gym_id: 'gym02',
            user_id: "user01"
        })

        const { checkInsCount } = await sut.execute({
            userId: 'user01',
    
        })

        expect(checkInsCount).toEqual(2)
    })
}) 