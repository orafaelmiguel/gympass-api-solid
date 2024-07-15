import { CreateGymUseCase } from "../create-gym"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repositorie"

export function makeCreateGymUseCase() {
    const gymsRepository = new PrismaGymsRepository
    const useCase = new CreateGymUseCase(gymsRepository)

    return useCase
}