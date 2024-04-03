import { prisma } from "@/lib/prisma";
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findById(id: string): Promise<User | null> {
        throw new Error('error')
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user
    }
}