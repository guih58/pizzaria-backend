import prismaClient from "../../prisma";

class DetailUserService{
    async execute(){


        const user = prismaClient.user.findFirst(
            {
                select:{
                    name:true,
                    email: true
                }
            }
        );




        return user
    }
}


export {DetailUserService}