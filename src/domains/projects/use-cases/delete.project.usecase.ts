import { IPresenter } from "../../../protocols/presenter";
import { HttpResponse } from '../../../protocols/http';
import { IProjectGateway } from "../interfaces/project.interfaces";

export class DeleteProjectUseCase {
  constructor(private readonly gateway: IProjectGateway, private presenter: IPresenter) {}
  
  async execute(id: number): Promise<HttpResponse> {
    try {
      this.gateway.loggerInfo('Deleting project', { id });
      await this.gateway.deleteProject(id);
      return this.presenter.OK();  
    } catch (error) {
      this.gateway.loggerInfo('Erro ao deletar project');
      return this.presenter.serverError('Erro ao deletar project');
    }
  }
}