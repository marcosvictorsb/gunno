import logger from '../../../config/logger';
import { CompanyRepository } from '../repositories/company.repository';
import { CompanyModel }from '../model/company.model';
import { CompanyGatewayDependencies, CompanyUseCases } from '../interfaces/company.interface';
import { CompanyController } from '../controllers/company.controller';
import { Presenter } from '../../../protocols/presenter';
import { CompanyGateway } from '../gateways/company.gateway';

// Configuração do repositório
const companyRepository = new CompanyRepository({ model: CompanyModel });

// Configuração dos adapters


// Configuração do gateway
const gateway: CompanyGatewayDependencies = {
  repository: companyRepository,
  logger
}

const companyGateway = new CompanyGateway(gateway);

// Configuração dos use-cases
const presenter = new Presenter();
// const createCompanyUseCase = new CreateCompanyUseCase(companyGateway, presenter);

// const useCases: CompanyUseCases = {
//   createCompany: createCompanyUseCase
// }

// const companyController = new CompanyController({useCases});

// // Exportação das instâncias
// export { companyController };
