import { Request, Response } from 'express';
import { GetProjectControllerDependencies, IGetProjectUseCases } from '../interfaces/';

export class GetProjectController {
  private getProjectUseCase: IGetProjectUseCases;

  constructor(params: GetProjectControllerDependencies){
    this.getProjectUseCase = params.getProjectUseCase;
  }

  public async getProjects(request: Request, response: Response): Promise<Response> {  
    const result = await this.getProjectUseCase.execute();
    return response.status(result.status).json(result.body);   
  }
}