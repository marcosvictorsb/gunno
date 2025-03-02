import { Presenter } from '../../../protocols/presenter';
import { RegisterUserGateway } from '../gateways/register.user.gateway';
import { UserModel } from '../model/user.model';
import { UserRepository } from '../repositories';
import { RegisterUserUseCase } from '../use-cases/register.user.usecase';
import { RegisterUserController } from '../controllers/register.user.controller';
import { CompanyRepository } from '../../../domains/company/repositories/company.repository';
import { CompanyModel } from '../../../domains/company/model/company.model';
import { EncryptionAdapter } from '../adapter/encryption.adapter';
import bcrypt from 'bcryptjs';
import logger from '../../../config/logger';

// Configuração do repositório
const userRepository = new UserRepository({ model: UserModel });
const companyRepository = new CompanyRepository({ model: CompanyModel })

const encryptionAdapter = new EncryptionAdapter({ bcrypt });

const registerUserGatewayDependencies = {
  repositories: {
    userRepository,
    companyRepository,
  },
  adapters: {
    encryption: encryptionAdapter
  },
  logger
}

const gateway = new RegisterUserGateway(registerUserGatewayDependencies)
const presenter = new Presenter();

const registerUserUseCase = new RegisterUserUseCase(gateway, presenter);

export const registerUserController = new RegisterUserController({ registerUser: registerUserUseCase });
