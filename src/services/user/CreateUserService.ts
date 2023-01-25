import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';


interface UserRequest{
    name: string;
    email: string
    password: string;
}

class CreateUserService{
    async execute({name, email, password}:UserRequest){
        
        //Verficando se ele enviou o e-mail
        if(!email){
            throw new Error("Email incorreto")
        }

        //Verficar se o email já está cadastrado no banco
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        //Se o email já existir ele vai retornar um erro
        if(userAlreadyExists){
            throw new Error("E-mail já cadastrado")
        }

        //Criptografano a senha
        const passwordHash = await hash(password, 8)


        // Criando o usuário
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password:passwordHash 
            },
            // o select e para falar o que você vai devolver
            select:{
                id: true,
                name: true,
                email: true
            }
        })
        
        return user
    }
}

export {CreateUserService}