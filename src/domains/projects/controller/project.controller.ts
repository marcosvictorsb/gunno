import { Request, Response } from 'express';
import { ProjectControllerDependencies, ProjectUseCases } from '../interfaces/project.interfaces';

export class ProjectController {
  private useCases: ProjectUseCases;

  constructor(params: ProjectControllerDependencies){
    this.useCases = params.useCases;
  }
  
  public async create(request: Request, response: Response): Promise<Response> {  
    const { name, description } = request.body; 
    const result = await this.useCases.createProject.execute({ name, description } );
    return response.status(result.status).json(result.body);   
  }

  public async getProjects(request: Request, response: Response): Promise<Response> {  
    const result = await this.useCases.getProjects.execute();
    return response.status(result.status).json(result.body);   
  }
}