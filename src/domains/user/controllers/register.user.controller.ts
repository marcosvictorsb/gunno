import { Request, Response } from 'express';
import { RegisterUserUseCase } from '../use-cases/register.user.usecase';
import { RegisterUserDependencies, RegisterUserInput  } from '../interfaces/register.interface';

export class RegisterUserController {
  private registerUserUseCase: RegisterUserUseCase;

  constructor(params: RegisterUserDependencies) {
    this.registerUserUseCase = params.registerUser;
  }

  public async registerUser(request: Request, response: Response): Promise<Response> {  
    const { name, email, password, company_domain, company_name } = request.body; 
    const payload: RegisterUserInput = {
      name,
      email,
      password,
      companyDomain: company_domain,
      companyName: company_name
    }
    
    const result = await this.registerUserUseCase.execute(payload);
    return response.status(result.status).json(result.body);   
  }
}

