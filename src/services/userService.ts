import repository from '../repositories/userRepository';
import { User } from '../entities/User';
import {BadRequestError, NotFoundError} from '../util/exceptions';

export class UserService {

    async findAll(): Promise<User[]> {
        return repository.findAll();
    }

    async findById(id: number): Promise<User | null> {
        return repository.findById(id);
    }

    async create(user: Omit<User, 'id'>): Promise<User> {
        if (!user.name || !user.email) {
            throw new BadRequestError('Name and email are required')
        }
        return repository.create(user);
    }

    async update(id: number, user: Partial<User>): Promise<User | null> {
        let foundUser = await repository.findById(id);
        if (foundUser) {
            return repository.update(id, user);
        }
        throw new NotFoundError(`User with id ${id} could not be updated because it not exists`)
    }

    async delete(id: number): Promise<void> {
        return repository.delete(id);
    }
}
export default new UserService();