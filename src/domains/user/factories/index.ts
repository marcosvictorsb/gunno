import { userController } from './user.factory'
import { registerUserController } from './register.user.factory'



export const controllers = {
  user: userController,
  registerUser: registerUserController
}