import { Request, Response } from 'express';
import { CreateProjectControllerDependencies, ICreateProjectUseCases} from '../interfaces/';

export class CreateProjectController {
  private createProjectUseCase: ICreateProjectUseCases;

  constructor(params: CreateProjectControllerDependencies){
    this.createProjectUseCase = params.createProjectUseCase;
  }
  
  public async create(request: Request, response: Response): Promise<Response> {  
    const { name, description } = request.body; 
    const result = await this.createProjectUseCase.execute({ name, description } );
    return response.status(result.status).json(result.body);   
  }
}