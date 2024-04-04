import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositorie'
import { CheckInUseCase } from '../check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-In Use case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gymid',
            userId: 'userid'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check-in twice in the same day', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gymid',
            userId: 'userid'
        })

        await expect(() => sut.execute({
            gymId: 'gymid',
            userId: 'userid'
        })).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check-in twice but in different days', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gymid',
            userId: 'userid'
        })

        vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gymid',
            userId: 'userid'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
}) 