import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repositorie"
import { CheckInUseCase } from "../check-in"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeCheckInUseCase() {
    const gymRepository = new PrismaGymsRepository
    const checkInsRepository = new PrismaCheckInsRepository

    const useCase = new CheckInUseCase(checkInsRepository, gymRepository)

    return useCase
}