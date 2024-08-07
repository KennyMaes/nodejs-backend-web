import {UpsertProjectDto} from '../dto/upsert-project.dto';
import {isNotBlank} from '../util/validation';
import {BadRequestError} from '../util/exceptions';
import {isNotEmpty} from 'class-validator';

export class Project {

    static newProject(dto: UpsertProjectDto): Project {
         const project = new Project(
            '',
            dto.name,
            dto.description
        );
         project.validate()
        return project;
    }

    private constructor(public id: string, public name: string, public description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    private validate() {
        if (!this.isValid()) {
            throw new BadRequestError('No valid project, name and description should both be filled in')
        }
    }

    private isValid() {
        return (
            isNotEmpty(this.name) &&
            isNotEmpty(this.description)
        )
    }
}