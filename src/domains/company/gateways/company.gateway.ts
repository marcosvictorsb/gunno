import { LoggerService } from '../../../services/logger.services';
import { CompanyEntity } from '../entities/company.entity';
import { InsertCompany, ICompanyGateway, ICompanyRepository, CompanyGatewayDependencies } from '../interfaces/company.interface';

export class CompanyGateway extends LoggerService implements ICompanyGateway  {
  companyRepository: ICompanyRepository;

  constructor(params: CompanyGatewayDependencies) {
    super(params);
    this.companyRepository = params.repository;
  }

  async createCompany(company: InsertCompany): Promise<CompanyEntity> {
    return this.companyRepository.create(company);
  } 
}
