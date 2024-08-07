import repository from '../repositories/user.repository';
import { User } from '../entities/user';
import {BadRequestError, NotFoundError} from '../util/exceptions';
import {UpsertUserDto} from '../dto/upsert-user.dto';

export class UserService {

    async findAll(): Promise<User[]> {
        return repository.findAll();
    }

    async findById(id: number): Promise<User> {
        const user = await repository.findById(id);
        if (user) {
            return user;
        }
        throw new BadRequestError(`No user found for id: ${id}`)
    }

    async create(user: Omit<User, 'id'>): Promise<User> {
        await this.validateEmailAdresAlreadyExists(user.email);
        return repository.create(user);
    }

    async update(id: number, upsertUser: Partial<UpsertUserDto>): Promise<User> {
        let currentUser = await repository.findById(id);
        if (currentUser) {
            if (upsertUser.email && currentUser.email !== upsertUser.email) {
                await this.validateEmailAdresAlreadyExists(upsertUser.email)
            }
            const updatedUser: User = User.updateUser(currentUser, upsertUser);
            return repository.update(id, updatedUser);
        }
        throw new NotFoundError(`User with id ${id} could not be updated because it not exists`)
    }

    async delete(id: number): Promise<void> {
        return repository.delete(id);
    }

    private async validateEmailAdresAlreadyExists(email: string) {
        let user = await repository.findByEmail(email);
        if (user) {
            throw new BadRequestError('Email address already exist')
        }
    }
}
export default new UserService();