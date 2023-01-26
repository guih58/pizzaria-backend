import prismaClient from "../../prisma";


class ListCategoryService{
    async execute(){
        //FindMany trás tudo da tabale category
        const category = await prismaClient.category.findMany({
            select:{
                id: true,
                name:true
            }
        });

        return category
    }


}


export {ListCategoryService}