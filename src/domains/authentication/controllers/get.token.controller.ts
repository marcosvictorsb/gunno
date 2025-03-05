import { Request, Response } from 'express';
import { GetTokenDependencies, GetTokenUseCases } from '../interfaces';


export class GetTokenController {
  private useCases: GetTokenUseCases;

  constructor(params: GetTokenDependencies) {
    this.useCases = params.getTokenUseCases;
  }

  public async getToken(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const result = await this.useCases.execute(email, password);
    return response.status(result.status).json(result);
  }
}

