import {Router} from "express";
import multer from 'multer'
import { CreateCategoryController } from "./Controllers/category/CreateCategoryController";
import { ListCategoryController } from "./Controllers/category/ListCategoryController";
import { CreateProductController } from "./Controllers/product/CreateProductController";
import { AuthUserController } from "./Controllers/user/AuthUserController";
import { CreateUserController } from "./Controllers/user/CreateUserController";
import { DetailUserController } from "./Controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import uploadConfig from './config/multer'
import { ListByCategoryController } from "./Controllers/product/ListByCategoryController";
import { CreateOrderController } from "./Controllers/order/CreateOrderController";
import { RemoveOrderController } from "./Controllers/order/RemoveOrderController";

const router = Router();

//Aqui e o multer que está configurado na pasta molter, recebendo a pasta onde a imagem vai ser salva.
const upload = multer(uploadConfig.upload("./tmp"))


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


// --ROTAS PRODUCT

//Cadastro de produto
//O Middlewares upload e para salvar a imagem, deve passar o file
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
//Rota para lista os produtos de acordo com a categoria
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)



// --ROTAS ORDER
//Rota para criar uma order
router.post('/order', isAuthenticated, new CreateOrderController().handle)
//Rota para deletar order
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)







export { router};