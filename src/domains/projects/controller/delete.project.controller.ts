import { Request, Response } from 'express';
import { IDeleteProjectUseCases, DeleteProjectControllerDependencies } from '../interfaces';

export class DeleteProjectController {
  private deleteProjectUseCase: IDeleteProjectUseCases;

  constructor(params: DeleteProjectControllerDependencies){
    this.deleteProjectUseCase = params.deleteProjectUseCase;
  }

  public async deleteProject(request: Request, response: Response): Promise<Response> {  
    const { id } = request.params;
    const result = await this.deleteProjectUseCase.execute(Number(id));
    return response.status(result.status).json(result.body);   
  }
}