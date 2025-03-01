import { IPresenter } from "../../../protocols/presenter";
import { HttpResponse } from '../../../protocols/http';
import { IProjectGateway } from "../interfaces/project.interfaces";

export class DeleteProjectUseCase {
  constructor(private readonly gateway: IProjectGateway, private presenter: IPresenter) {}
  
  async execute(id: number): Promise<HttpResponse> {
    try {
      this.gateway.loggerInfo('Deleting project', { id });
      const affectedRows = await this.gateway.deleteProject(id);
      if (!affectedRows) {
        this.gateway.loggerInfo('Não foi possivel deletar o projeto',{ id });
        return this.presenter.conflict('Erro ao deletar projeto');
      }
      return this.presenter.OK();  
    } catch (error) {
      this.gateway.loggerInfo('Erro ao deletar project');
      return this.presenter.serverError('Erro ao deletar project');
    }
  }
}