import { ModelStatic } from 'sequelize';
import { CompanyEntity } from '../entities/company.entity';
import { CompanyModel } from '../model/company.model';
import { HttpResponse } from '../../../protocols/presenter';
import logger from '../../../config/logger';
import { ILoggerMixin } from '../../../services/';

export type CompanyInput = {
  
}

export type InsertCompany = {
  name: string,
  domain: string
}

export type FindCompanyCriteria = {
  id?: number,
  name?: string,
  domain?: string
}

export type UpdateCriteria = {
  id: number
}

export type DeleteCriteria = {
  id: number
}

export type CompanyRepositoryDependencies = {
  model: ModelStatic<CompanyModel>
}

export type CompanyUseCases = {
  createCompany: { execute(company: InsertCompany): Promise<HttpResponse> },
}

export type CompanyControllerDependencies = {
  useCases: CompanyUseCases
}

export type CompanyGatewayDependencies = {
  repository: ICompanyRepository;
  logger: typeof logger
}

export interface ICompanyGateway extends ILoggerMixin {
  createCompany(company: InsertCompany): Promise<CompanyEntity>;
}

export interface ICompanyRepository {
  create(criteria: InsertCompany): Promise<CompanyEntity>;
  find(criteria: FindCompanyCriteria): Promise<CompanyEntity | null>;
  findAll(criteria: FindCompanyCriteria): Promise<CompanyEntity[]>;
  update(criteria: UpdateCriteria, data: Partial<CompanyEntity>): Promise<CompanyEntity | null>;
  delete(criteria: DeleteCriteria): Promise<boolean>;
}
