import logger from '../../../config/logger';
import { ProjectRepository } from '../repositories/project.repository';
import ProjectModel from '../model/project.model';
import { DeleteProjectGatewayDependencies } from '../interfaces';
import { DeleteProjectController } from '../controller/';
import { Presenter } from '../../../protocols/presenter';
import { DeleteProjectGateway } from '../gateways/';
import { DeleteProjectUseCase } from '../usecases/';

// Configuração do repositório
const projectRepository = new ProjectRepository({ model: ProjectModel });

// Configuração dos adapters


// Configuração do gateway
const gateway: DeleteProjectGatewayDependencies = {
  repository: projectRepository,
  logger
}

const projectGateway = new DeleteProjectGateway(gateway);


// Configuração dos use-cases
const presenter = new Presenter();
const deleteProjectUseCase = new DeleteProjectUseCase(projectGateway, presenter);
const deleteProjectController = new DeleteProjectController({deleteProjectUseCase});

// Exportação das instâncias
export { deleteProjectController };