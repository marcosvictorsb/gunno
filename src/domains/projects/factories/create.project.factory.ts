import logger from '../../../config/logger';
import { ProjectRepository } from '../repositories/project.repository';
import {CreateProjectUseCase } from '../usecases';
import ProjectModel from '../model/project.model';
import { CreateProjectGatewayDependencies } from '../interfaces/';
import { CreateProjectController } from '../controller/create.project.controller';
import { Presenter } from '../../../protocols/presenter';
import { CreateProjectGateway } from '../gateways/';

// Configuração do repositório
const projectRepository = new ProjectRepository({ model: ProjectModel });

// Configuração dos adapters


// Configuração do gateway
const gateway: CreateProjectGatewayDependencies = {
  repository: projectRepository,
  logger
}

const projectGateway = new CreateProjectGateway(gateway);


// Configuração dos use-cases
const presenter = new Presenter();
const createProjectUseCase = new CreateProjectUseCase(projectGateway, presenter);
const createProjectController = new CreateProjectController({createProjectUseCase});

// Exportação das instâncias
export { createProjectController };