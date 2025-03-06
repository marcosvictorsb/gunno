import { ModelStatic } from "sequelize";
import { ProjectEntity } from "../entities/project.entity";
import ProjectModel from "../model/project.model";
import { HttpResponse } from "../../../protocols";
import logger from "../../../config/logger";
import { ILoggerMixin } from "../../../services/logger.service";
import { InsertCriteria, IProjectRepository } from "./project.repository.interface";

export type DeleteProjectInput = {
  name: string,
  description: string,
}

export type DeleteProjectRepositoryDependencies = {
  model: ModelStatic<ProjectModel>
}

export type IDeleteProjectUseCases = {
  execute(id: number): Promise<HttpResponse>
}

export type DeleteProjectControllerDependencies = {
  deleteProjectUseCase: IDeleteProjectUseCases
}

export type DeleteProjectGatewayDependencies = {
  repository: IProjectRepository;
  logger: typeof logger
}

export interface IDeleteProjectGateway extends ILoggerMixin {
  deleteProject(id: number): Promise<boolean>;
}
