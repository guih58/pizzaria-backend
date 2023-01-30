import { Request, Response } from "express";
import { RemoveItemSerivice } from "../../services/order/RemoveItemSerivice";


class RemoveItemController{
    async handle(req:Request, res:Response){

        const item_id = req.query.item_id as string;

        const removeItemService = new RemoveItemSerivice();
        const item = await removeItemService.execute({
            item_id
        })

        return res.json(item)

    }
}


export {RemoveItemController}