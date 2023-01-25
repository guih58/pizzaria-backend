import {Router} from "express";
import { AuthUserController } from "./Controllers/user/AuthUserController";
import { CreateUserController } from "./Controllers/user/CreateUserController";


const router = Router();


//--ROTAS USER --

//Criando um usuário
router.post('/users', new CreateUserController().handle)
//Autenticação do usuário
router.post('/session', new AuthUserController().handle)


export { router};