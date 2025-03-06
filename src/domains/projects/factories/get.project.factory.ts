import logger from '../../../config/logger';
import { ProjectRepository } from '../repositories/project.repository';
import { GetProjectsUseCase } from '../usecases';
import ProjectModel from '../model/project.model';
import { GetProjectGatewayDependencies } from '../interfaces';
import { GetProjectController } from '../controller';
import { Presenter } from '../../../protocols/presenter';
import { GetProjectGateway } from '../gateways/';

// Configuração do repositório
const projectRepository = new ProjectRepository({ model: ProjectModel });

// Configuração dos adapters


// Configuração do gateway
const gateway: GetProjectGatewayDependencies = {
  repository: projectRepository,
  logger
}

const projectGateway = new GetProjectGateway(gateway);


// Configuração dos use-cases
const presenter = new Presenter();
const getProjectUseCase = new GetProjectsUseCase(projectGateway, presenter);
const getProjectController = new GetProjectController({getProjectUseCase});

// Exportação das instâncias
export { getProjectController };