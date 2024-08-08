import {NextFunction, Request, Response, Router} from 'express';
import service from '../services/project.service';
import {BadRequestError} from '../util/exceptions';
import {UpsertProjectDto} from '../dto/upsert-project.dto';
import {Project} from '../entities/project';

const projectcontroller  = Router()

projectcontroller.get(``, (req: Request, res: Response, next: NextFunction) => getAllProjects(req, res).catch(next));
projectcontroller.get(`/search`, (req: Request<never, never, never, { nameSearch: string }>, res: Response, next: NextFunction) => getProjectsByNameSeach(req, res).catch(next));
projectcontroller.get(`/:id`, (req: Request<{ id: string }>, res: Response, next: NextFunction) => getProjectById(req, res).catch(next));
projectcontroller.post(``, (req: Request<never, never, UpsertProjectDto>, res: Response, next: NextFunction) => createProject(req, res).catch(next));
projectcontroller.put(`/:id`, (req: Request<{ id: string }, never, UpsertProjectDto>, res: Response, next: NextFunction) => updateProject(req, res).catch(next));
projectcontroller.delete(`/:id`, (req: Request<{ id: string }>, res: Response, next: NextFunction) => deleteProject(req, res).catch(next));

async function getAllProjects(req: Request, res: Response) {
    const projects: Project[] = await service.findAll();
    res.json(projects);
}

async function getProjectById(req: Request<{ id: string }>, res: Response) {
    const id = Number(req.params.id);
    const project: Project = await service.findById(id);
    res.status(201).send(project);
}


async function getProjectsByNameSeach(req: Request<never, never, never, { nameSearch: string }>, res: Response) {
    const nameSearch: string = req.query.nameSearch;
    validateNameSearch(nameSearch);
    const projects = await service.findProjectsByName(req.query.nameSearch);
    res.status(201).send(projects);
}

async function createProject(req: Request<never, never, UpsertProjectDto>, res: Response) {
    const project = Project.newProject(req.body);
    const newProject = await service.create(project);
    res.json(newProject);
}

async function updateProject(req: Request<{ id: string }, never, UpsertProjectDto>, res: Response) {
    const id = Number(req.params.id);
    const project: Project = Project.newProject(req.body);
    const updatedProject = await service.update(id, project);
    res.json(updatedProject);
}

async function deleteProject(req: Request<{ id: string }>, res: Response) {
    await service.delete(Number(req.params.id));
    res.status(204).end();
}

const validateNameSearch = (nameSearch: string) => {
    if (!nameSearch || nameSearch.trim() === '') {
        throw new BadRequestError('Please provide a nameSearch');
    }
    const regex = /^[a-zA-Z0-9 ]+$/;
    if (!regex.test(nameSearch)) {
        throw new BadRequestError('nameSearch contains invalid characters');
    }
}

export { projectcontroller }