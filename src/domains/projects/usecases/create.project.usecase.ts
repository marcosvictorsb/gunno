import { InsertCriteria, ICreateProjectGateway, ProjectInput } from '../interfaces/';
import { IPresenter } from '../../../protocols/presenter';
import { HttpResponse } from '../../../protocols/http';

export class CreateProjectUseCase {
  constructor(private readonly gateway: ICreateProjectGateway, private presenter: IPresenter) {}

  async execute(input: ProjectInput): Promise<HttpResponse> {
    this.gateway.loggerInfo('Creating projeto', { input });

    const payload: InsertCriteria = {
      name: input.name,
      description: input.description,
    }
    const projectCreated = await this.gateway.createProject(payload);
    if(!projectCreated) {
      this.gateway.loggerInfo('Erro ao criar projeto');
      return this.presenter.conflict('Erro ao criar projeto');
    }

    return this.presenter.created();
  }
}