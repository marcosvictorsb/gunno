import { IUserGateway } from '../interfaces/user.interface';
import { IPresenter } from '../../../protocols/presenter';
import { HttpResponse } from '../../../protocols/http';
import { FindCompanyCriteria, IRegisterUserGateway, RegisterUserInput } from '../interfaces';
import { Json } from 'sequelize/types/utils';

export class RegisterUserUseCase {
  constructor(private readonly gateway: IRegisterUserGateway, private presenter: IPresenter) {}

  async execute(input: RegisterUserInput): Promise<HttpResponse> {
    try {
      this.gateway.loggerInfo('Cadastrando novo usuário', { input: JSON.stringify(input) });

      const { email, password, name, companyName, companyDomain } = input;

      const existingUser = await this.gateway.findUserByEmail(email);
      if (existingUser) {
        this.gateway.loggerInfo('Já existe um usuário para esse email', email);
        return this.presenter.conflict('Email já cadastrado');
      }

      const findCompanyCriteria: FindCompanyCriteria = {
        domain: input.companyDomain,
        name: input.companyName
      }

      const existingCompany = await this.gateway.findCompany(findCompanyCriteria);
      if(!existingCompany) {
        this.gateway.loggerInfo('Empresa já cadastrada', {
          domain: input.companyDomain,
          name: input.companyName
        });
        return this.presenter.conflict('Empresa já cadastrada');
      }

      this.gateway.begin()
      const companyCreated = await this.gateway.createCompany({ name: companyName, domain: companyDomain })

      const userCreated = await this.gateway.createUser({ name, email, password, id_company: companyCreated.id })
      this.gateway.commit();
      

      return this.presenter.created();    
    } catch (error: any) {
      this.gateway.rollback()
      this.gateway.loggerErro('error', error);
      return this.presenter.serverError(); 
    }    
  }
}