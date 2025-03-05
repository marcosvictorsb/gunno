import { UserRepository } from "./../../../domains/user/repositories"
import { GetTokenGateway } from "../gateways/get.token.gateway"
import { GetTokenUseCase } from "../usecases/get.token.usecase"
import { UserModel } from "./../../../domains/user/model/user.model"
import { Presenter } from "./../../../protocols"
import { GetTokenDependencies, IAuthenticationGatewayDependencies } from "../interfaces"
import { GetTokenController } from "../controllers/get.token.controller"
import logger from "../../../config/logger"

const repositories: IAuthenticationGatewayDependencies = {
  repositories: {
    user: new UserRepository({ model: UserModel })
  },
  logger
}

const presenter = new Presenter();


const getTokenGateway = new GetTokenGateway(repositories)
const getTokenUseCase = new GetTokenUseCase(getTokenGateway, presenter)

const useCases: GetTokenDependencies = {
  getTokenUseCases: getTokenUseCase
}

export const getTokenController = new GetTokenController(useCases)