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

    validate(): void {
        if (!this.isValid()) {
            throw new BadRequestError('No valid user, name and email should both be filled in')
        }
    }

    isValid(): boolean {
        return isNotBlank(this.name)
            && isNotBlank(this.email)
    }
}