import { SearchGymsUseCase } from "../search-gyms"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repositorie"

export function makeSearchGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository
    const useCase = new SearchGymsUseCase(gymsRepository)

    return useCase
}