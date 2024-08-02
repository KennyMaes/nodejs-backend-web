import { UserRepository } from '../repositories/userRepository';
import { User } from '../entities/User';
import {BadRequestError} from '../util/exceptions';

export class UserService {
    private userRepository = new UserRepository();

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async findById(id: number): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async create(user: Omit<User, 'id'>): Promise<User> {
        if (!user.name || !user.email) {
            throw new BadRequestError('Name and email are required')
        }
        return this.userRepository.create(user);
    }

    async update(id: number, user: Partial<User>): Promise<User | null> {
        return this.userRepository.update(id, user);
    }

    async delete(id: number): Promise<void> {
        return this.userRepository.delete(id);
    }
}