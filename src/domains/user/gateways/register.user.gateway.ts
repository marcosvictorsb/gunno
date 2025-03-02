import { UserEntity } from '../entities/user.entity';
import { FindCompanyCriteria, InsertUserCriteria, IRegisterUserGateway, IRegisterUserRepositories, RegisterUserAdapters, RegisterUserGatewayDependencies } from '../interfaces';
import { CompanyEntity } from '../../company/entities/company.entity';
import { LoggerService } from '../../../services/logger.services';
import { InsertCompany } from '../../../domains/company/interfaces/company.interface';


export class RegisterUserGateway extends LoggerService implements IRegisterUserGateway {
  repositories: IRegisterUserRepositories;
  adapters: RegisterUserAdapters

  constructor(params: RegisterUserGatewayDependencies) {
    super(params);
    this.repositories = params.repositories;
    this.adapters = params.adapters
  }
  
  async createCompany(insert: InsertCompany): Promise<CompanyEntity> {
    return await this.repositories.companyRepository.create(insert);      
  }

  async findCompany(criteria: FindCompanyCriteria): Promise<CompanyEntity | null> {
    return this.repositories.companyRepository.find(criteria);
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.repositories.userRepository.find({ email});
  }

  async createUser(criteria: InsertUserCriteria): Promise<UserEntity> {
    const hashedPassword = this.adapters.encryption.generateHashPassword(criteria.password);
    criteria.password = hashedPassword
    return this.repositories.userRepository.create(criteria)
  }
}