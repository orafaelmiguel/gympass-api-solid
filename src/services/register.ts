import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) throw new UserAlreadyExistsError()

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        })

        return { user }
    }
}