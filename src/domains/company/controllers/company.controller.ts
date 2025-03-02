import { Request, Response } from 'express';
import { CompanyControllerDependencies, CompanyUseCases } from '../interfaces/company.interface';

export class CompanyController {
  private useCases: CompanyUseCases;

  constructor(params: CompanyControllerDependencies){
    this.useCases = params.useCases;
  }
  
  public async create(request: Request, response: Response): Promise<Response> {  
    const { name, domain } = request.body; 
    const result = await this.useCases.createCompany.execute({ name, domain } );
    return response.status(result.status).json(result.body);   
  }
}
