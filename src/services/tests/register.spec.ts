import { it, describe, expect } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'

describe('Register Use case', () => {
    it('should hash user password upon registration', async () => {
        const registerUseCase = new RegisterUseCase({
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async findByEmail(email) {
                return null
            },

            async create(data) {
                return {
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date()
                }
            }
        })

        const { user } = await registerUseCase.execute({
            name: 'Test',
            email: 'test@email.com',
            password: 'password'
        })

        const isPasswordCorrectlyHashed = await compare('password', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
}) 