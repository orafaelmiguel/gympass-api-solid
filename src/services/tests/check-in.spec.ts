import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositorie'
import { CheckInUseCase } from '../check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-In Use case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gymid',
            userId: 'userid'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    
}) 