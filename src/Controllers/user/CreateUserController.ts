import { Request, response, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";


class CreateUserController{
    async handle(req: Request, res: Response){

        //Usando o destructor para separar os atributos que vem da requisição
        const {name, email, password } = req.body;

        //Estanciando o serviço
        const createUserService = new CreateUserService();

        //Chamando o metodo do serviço e passando os atributos
        const user = await createUserService.execute({
            name,
            password,
            email
        })

        return res.json(user)

    }
}

export {CreateUserController}