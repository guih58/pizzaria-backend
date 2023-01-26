import {Router} from "express";
import { CreateCategoryController } from "./Controllers/category/CreateCategoryController";
import { ListCategoryController } from "./Controllers/category/ListCategoryController";
import { AuthUserController } from "./Controllers/user/AuthUserController";
import { CreateUserController } from "./Controllers/user/CreateUserController";
import { DetailUserController } from "./Controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";


const router = Router();


//--ROTAS USER --

//Criando um usuário
router.post('/users', new CreateUserController().handle)
//Autenticação do usuário
router.post('/session', new AuthUserController().handle)
//Trazer dados do usuário
// o IsAuthenticated e um middlewares que e nada mais que uma logica para proceguir com a execulção do serviço
router.get('/me', isAuthenticated  ,new DetailUserController().handle)


// -- ROTAS CATEGORIAS

//Criando categorias
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
//listando categorias
router.get('/category', isAuthenticated, new ListCategoryController().handle)

export { router};