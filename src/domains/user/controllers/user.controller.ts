import { Request, Response } from 'express';
import { CreateUserUseCase } from '../use-cases/create.user.usecase';
import { UserControllerParams } from '../interfaces/user.interface';

interface IUserController {
  create(request: Request, response: Response): Promise<Response>;
}

export class UserController implements IUserController{
  protected createUser: CreateUserUseCase;

  constructor(params: UserControllerParams) {
    this.createUser = params.useCases.createUser;
  }

  public async create(request: Request, response: Response): Promise<Response> {  
    const { email, password } = request.body; 
    const result = await this.createUser.execute(email, password);
    return response.status(result.status).json(result.body);   
  }
}

