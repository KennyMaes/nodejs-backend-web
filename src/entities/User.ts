import {UpsertUserDto} from '../dto/upsertUserDto';
import {BadRequestError} from '../util/exceptions';
import {isNotBlank} from '../util/validation';
import {UserDto} from '../dto/userDto';

export class User {
    static newUser(dto: UpsertUserDto): User {
        const user = new User(
            '',
            dto.name,
            dto.email
        );
        user.validate();
        return user;
    }

    static updateUser(user: User, dto: Partial<User>): User {
        user.name = dto.name ? dto.name : user.name
        user.email = dto.email ? dto.email : user.email
        return user;
    }

    static fromDb(userDto: UserDto): User {
        return new User(
            userDto.id,
            userDto.name,
            userDto.email)
    }

    constructor(public id: string, public name: string, public email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    private validate(): void {
        if (!this.nameIsValid()) {
            throw new BadRequestError('Invalid name')
        }
        if (!this.emailIsValid()) {
            throw new BadRequestError('Invalid email')
        }
    }

    private emailIsValid() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return isNotBlank(this.email)
            && emailRegex.test(this.email);
    }

    private nameIsValid(): boolean {
        const alphaRegex = /^[a-zA-Z\s]+$/;
        return isNotBlank(this.name)
        && alphaRegex.test(this.name);
    }
}