import { ProjectEntity } from "../entities/project.entity"

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

export interface IProjectRepository {
  create(criteria: InsertCriteria): Promise<ProjectEntity>;
  find(criteria: FindCriteria): Promise<ProjectEntity | null>;
  findAll(criteria: FindCriteria): Promise<ProjectEntity[]>;
  update(id: number, data: Partial<ProjectEntity>): Promise<ProjectEntity | null>;
  delete(id: number): Promise<boolean>;
}