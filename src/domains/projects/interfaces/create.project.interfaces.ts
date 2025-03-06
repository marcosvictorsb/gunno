import { ModelStatic } from "sequelize";
import { ProjectEntity } from "../entities/project.entity";
import ProjectModel from "../model/project.model";
import { HttpResponse } from "../../../protocols";
import logger from "../../../config/logger";
import { ILoggerMixin } from "../../../services/logger.service";
import { InsertCriteria, IProjectRepository } from "./project.repository.interface";

export type ProjectInput = {
  name: string,
  description: string,
}

export type ProjectRepositoryDependencies = {
  model: ModelStatic<ProjectModel>
}

export type ICreateProjectUseCases = {
  execute(project: InsertCriteria): Promise<HttpResponse>
}

export type CreateProjectControllerDependencies = {
  createProjectUseCase: ICreateProjectUseCases
}

export type CreateProjectGatewayDependencies = {
  repository: IProjectRepository;
  logger: typeof logger
}

export interface ICreateProjectGateway extends ILoggerMixin {
  createProject(project: InsertCriteria): Promise<ProjectEntity>;
}

