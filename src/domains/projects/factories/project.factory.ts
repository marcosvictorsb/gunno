import logger from '../../../config/logger';
import { ProjectRepository } from '../repositories/project.repository';
import { CreateProjectUseCase } from '../use-cases/create.project.usecase';
import ProjectModel from '../model/project.model';
import { ProjectGatewayDependencies, ProjectUseCases } from '../interfaces/project.interfaces';
import { ProjectController } from '../controller/project.controller';
import { Presenter } from '../../../protocols/presenter';
import { ProjectGateway } from '../gateways/project.gateway';

// Configuração do repositório
const userRepository = new ProjectRepository({ model: ProjectModel });

// Configuração dos adapters


// Configuração do gateway
const gateway: ProjectGatewayDependencies = {
  repository: userRepository,
  logger
}

const projectGateway = new ProjectGateway(gateway);


// Configuração dos use-cases
const presenter = new Presenter();
const createUserUseCase = new CreateProjectUseCase(projectGateway, presenter);

const useCases: ProjectUseCases = {
  createProject: createUserUseCase
}
const projectController = new ProjectController({useCases});

// Exportação das instâncias
export { projectController };