import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositorie'
import { CheckInUseCase } from '../check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-In Use case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        await gymsRepository.create({
            id: 'gymid',
            title: 'gym',
            phone: '',
            description: '',
            latitude: 0,
            longitude: 0
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gymid',
            userId: 'userid',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check-in twice in the same day', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gymid',
            userId: 'userid',
            userLatitude: 0,
            userLongitude: 0
        })

        await expect(() => sut.execute({
            gymId: 'gymid',
            userId: 'userid',
            userLatitude: 0,
            userLongitude: 0
        })).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check-in twice but in different days', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gymid',
            userId: 'userid',
            userLatitude: 0,
            userLongitude: 0
        })

        vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gymid',
            userId: 'userid',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gymid',
            title: 'gym',
            phone: '',
            description: '',
            latitude: new Decimal(-23.0607403),
            longitude: new Decimal(-46.4434254)
        })
        
        expect(() => sut.execute({
            gymId: 'gymid',
            userId: 'userid',
            userLatitude: -23.4636868,
            userLongitude: -46.2557441
        })).rejects.toBeInstanceOf(Error)
    })
}) 