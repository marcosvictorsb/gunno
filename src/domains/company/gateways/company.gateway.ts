import { LoggerMixin } from '../../../services/';
import { CompanyEntity } from '../entities/company.entity';
import { InsertCompany, ICompanyGateway, ICompanyRepository, CompanyGatewayDependencies } from '../interfaces/company.interface';

class BaseGateway { constructor(...args: any[]) {} }
const MixedGateway = LoggerMixin(BaseGateway);


export class CompanyGateway extends MixedGateway implements ICompanyGateway  {
  companyRepository: ICompanyRepository;

  constructor(params: CompanyGatewayDependencies) {
    super();
    this.companyRepository = params.repository;
  }

  async createCompany(company: InsertCompany): Promise<CompanyEntity> {
    return this.companyRepository.create(company);
  } 
}
