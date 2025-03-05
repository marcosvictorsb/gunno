import { ModelStatic } from "sequelize";
import { ProjectEntity } from "../entities/project.entity";
import ProjectModel from "../model/project.model";
import { HttpResponse } from "../../../protocols/";
import logger from "../../../config/logger";
import { ILoggerMixin } from "../../../services/logger.service";

export type ProjectInput = {
  name: string,
  description: string,
}

export type InsertCriteria = {
  name: string,
  description: string,
}

export type FindCriteria = {
  id?: number,
  name?: string,
}

export type UpdateCriteria = {
  id: number
}

export type DeleteCriteria = {
  id: number
}

export type ProjectRepositoryDependencies = {
  model: ModelStatic<ProjectModel>
}

export type ProjectUseCases = {
  createProject: { execute(project: InsertCriteria): Promise<HttpResponse> },
  getProjects: { execute(): Promise<HttpResponse> },
  deleteProject: { execute(id: number): Promise<HttpResponse> }
}

export type ProjectControllerDependencies = {
  useCases: ProjectUseCases
}

export type ProjectGatewayDependencies = {
  repository: IProjectRepository;
  logger: typeof logger
}

export interface IProjectGateway extends ILoggerMixin {
  createProject(project: InsertCriteria): Promise<ProjectEntity>;
  getProjects(): Promise<ProjectEntity[]>;
  deleteProject(id: number): Promise<boolean>;
}

export interface IProjectRepository {
  create(criteria: InsertCriteria): Promise<ProjectEntity>;
  find(criteria: FindCriteria): Promise<ProjectEntity | null>;
  findAll(criteria: FindCriteria): Promise<ProjectEntity[]>;
  update(id: number, data: Partial<ProjectEntity>): Promise<ProjectEntity | null>;
  delete(id: number): Promise<boolean>;
}