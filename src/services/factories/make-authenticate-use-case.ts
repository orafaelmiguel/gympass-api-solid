import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository()
    const useCase = new AuthenticateUseCase(prismaUsersRepository)

    return useCase
}