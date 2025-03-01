import logger from '../../../config/logger';
import { ProjectRepository } from '../repositories/project.repository';
import {CreateProjectUseCase, GetProjectsUseCase } from '../use-cases/';
import ProjectModel from '../model/project.model';
import { ProjectGatewayDependencies, ProjectUseCases } from '../interfaces/project.interfaces';
import { ProjectController } from '../controller/project.controller';
import { Presenter } from '../../../protocols/presenter';
import { ProjectGateway } from '../gateways/project.gateway';
import { DeleteProjectUseCase } from '../use-cases/delete.project.usecase';

// Configuração do repositório
const projectRepository = new ProjectRepository({ model: ProjectModel });

// Configuração dos adapters


// Configuração do gateway
const gateway: ProjectGatewayDependencies = {
  repository: projectRepository,
  logger
}

const projectGateway = new ProjectGateway(gateway);


// Configuração dos use-cases
const presenter = new Presenter();
const createProjectUseCase = new CreateProjectUseCase(projectGateway, presenter);
const getProjectsUseCase = new GetProjectsUseCase(projectGateway, presenter);
const deleteProjectUseCase = new DeleteProjectUseCase(projectGateway, presenter);

const useCases: ProjectUseCases = {
  createProject: createProjectUseCase,
  getProjects: getProjectsUseCase,
  deleteProject: deleteProjectUseCase
}
const projectController = new ProjectController({useCases});

// Exportação das instâncias
export { projectController };