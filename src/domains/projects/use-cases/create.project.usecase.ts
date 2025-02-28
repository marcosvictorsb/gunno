import { InsertCriteria, IProjectGateway, ProjectInput } from '../interfaces/project.interfaces';
import { IPresenter } from '../../../protocols/presenter';
import { HttpResponse } from '../../../protocols/http';

export class CreateProjectUseCase {
  constructor(private readonly gateway: IProjectGateway, private presenter: IPresenter) {}

  async execute(input: ProjectInput): Promise<HttpResponse> {
    this.gateway.loggerInfo('Creating projeto', { input });

    const payload: InsertCriteria = {
      name: input.name,
      description: input.description,
    }
    const projectCreated = await this.gateway.createProject(payload);
    if(!projectCreated) {
      this.gateway.loggerInfo('Erro ao criar projeto');
      return this.presenter.serverError('Erro ao criar projeto');
    }

    return this.presenter.OK();
  }
}