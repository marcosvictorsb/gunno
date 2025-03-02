import { ModelStatic } from 'sequelize';
import { UserEntity } from '../entities/user.entity';
import { UserModel } from '../model/user.model';
import { IEncryption } from '../adapter/encryption.adapter';
import { CreateUserUseCase } from '../use-cases/create.user.usecase';
import { CompanyEntity } from '../../../domains/company/entities/company.entity';
import { IUserRepository } from './user.interface';
import { RegisterUserUseCase } from '../use-cases/register.user.usecase';
import { LoggerService } from '../../../services/logger.services';
import logger from '../../../config/logger';
import { ICompanyRepository, InsertCompany } from '../../../domains/company/interfaces/company.interface';


export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  companyName: string,
  companyDomain: string,
}

export type FindCompanyCriteria = {
  name?: string;
  domain?: string;
}


export type IRegisterUserRepositories = {
  userRepository: IUserRepository;
  companyRepository: ICompanyRepository
}

export type FindRegisterUserCriteria = {
  name?: string;
  email?: string;
  password?: string;
}

export type InsertUserCriteria = {
  name: string;
  email: string;
  password: string;
  id_company: number;
}

export type RegisterUserAdapters = {
  encryption: IEncryption;
}

export type RegisterUserGatewayDependencies = {
  repositories: IRegisterUserRepositories;
  logger: typeof logger;
  adapters: RegisterUserAdapters
}

export type RegisterUserDependencies = {
  registerUser: RegisterUserUseCase
}

export interface IRegisterUserRepository {
  find(criteria: FindRegisterUserCriteria): Promise<UserEntity | null>;
}

export interface IRegisterUserGateway extends LoggerService{
  findUserByEmail(email: string): Promise<UserEntity | null>;
  findCompany(criteria: FindCompanyCriteria): Promise<CompanyEntity | null>;
  createUser(criteria: InsertUserCriteria): Promise<UserEntity>
  createCompany(insert: InsertCompany):  Promise<CompanyEntity>
}
