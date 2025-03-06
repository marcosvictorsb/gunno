
import { LoggerMixin } from "../../../services";
import { ProjectEntity } from "../entities/project.entity";
import { InsertCriteria, ICreateProjectGateway, IProjectRepository, CreateProjectGatewayDependencies } from "../interfaces";

class BaseGateway { constructor(...args: any[]) {} }
const MixedGateway = LoggerMixin(BaseGateway);

export class CreateProjectGateway extends MixedGateway implements ICreateProjectGateway  {
  projectRepository: IProjectRepository;

  constructor(params: CreateProjectGatewayDependencies) {
    super(params);
    this.projectRepository = params.repository;
  }  

  async createProject(project: InsertCriteria): Promise<ProjectEntity> {
    return this.projectRepository.create(project);
  }
}