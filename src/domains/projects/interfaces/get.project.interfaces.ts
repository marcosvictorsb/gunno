import { ModelStatic } from "sequelize";
import { ProjectEntity } from "../entities/project.entity";
import ProjectModel from "../model/project.model";
import { HttpResponse } from "../../../protocols";
import logger from "../../../config/logger";
import { ILoggerMixin } from "../../../services/logger.service";
import { InsertCriteria, IProjectRepository } from "./project.repository.interface";

export type GetProjectInput = {
  name: string,
  description: string,
}

export type GetProjectRepositoryDependencies = {
  model: ModelStatic<ProjectModel>
}

export type IGetProjectUseCases = {
  execute(): Promise<HttpResponse>
}

export type GetProjectControllerDependencies = {
  getProjectUseCase: IGetProjectUseCases
}

export type GetProjectGatewayDependencies = {
  repository: IProjectRepository;
  logger: typeof logger
}

export interface IGetProjectGateway extends ILoggerMixin {
  getProjects(): Promise<ProjectEntity[]>;
}
