import { ModelStatic } from "sequelize";
import ProjectModel from "../model/project.model";
import { DeleteCriteria, FindCriteria, InsertCriteria, IProjectRepository, ProjectRepositoryDependencies, UpdateCriteria } from "../interfaces/project.interfaces";
import { ProjectEntity } from "../entities/project.entity";

export class ProjectRepository implements IProjectRepository  {
  protected model: ModelStatic<ProjectModel> ;

  constructor(params: ProjectRepositoryDependencies) {
    this.model = params.model;
  }  

  private getConditions(criteria: FindCriteria): Record<string, any> {    
    const whereConditions: Record<string, any> = {};

    if (criteria.id) {
      whereConditions['id'] = criteria.id;
    }

    if (criteria.name) {
      whereConditions['name'] = criteria.name;
    }
    
    return whereConditions;
  }

  public async create(project: InsertCriteria): Promise<ProjectEntity> {
    const createdProject = await this.model.create(project);
    return new ProjectEntity(
      createdProject.id,
      createdProject.uuid,
      createdProject.name,
      createdProject.description,
      createdProject.created_at,
      createdProject.updated_at,
    );;
  }

  public async find(criteria: FindCriteria): Promise<ProjectEntity | null> {
    const project = await this.model.findOne({
      where: this.getConditions(criteria),
      raw: true,
    });

    if (!project) return null;

    return new ProjectEntity(
      project.id,
      project.uuid,
      project.name,
      project.description,
      project.created_at,
      project.updated_at,
    );
  }

  public async findAll(): Promise<ProjectEntity[]> {
    const projects = await this.model.findAll();
    return projects.map(
      (project: ProjectEntity) =>
        new ProjectEntity(
          project.id,
          project.uuid,
          project.name,
          project.description,
          project.created_at,
          project.updated_at,
        ),
    );
  }

  public async update(criteria: UpdateCriteria, data: Partial<ProjectEntity>): Promise<ProjectEntity | null> {
    const [affectedRows] = await this.model.update(data, { where: { id: criteria.id } });
    if (affectedRows === 0) return null;

    const updatedProject = await this.model.findByPk(criteria.id);
    if (!updatedProject) return null;

    return new ProjectEntity(
      updatedProject.id,
      updatedProject.uuid,
      updatedProject.name,
      updatedProject.description,
      updatedProject.created_at,
      updatedProject.updated_at,
    );
  }

  public async delete(criteria: DeleteCriteria): Promise<boolean> {
    const affectedRows = await this.model.destroy({ where: { id: criteria.id } });
    return affectedRows > 0;
  }
}