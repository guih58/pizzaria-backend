import { Response  } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";


class ListOrderController{
    async handle(res: Response){
        const listOrderService = new ListOrderService();
        const orders = await listOrderService.execute()


        return res.json(orders)
    }
}


export {ListOrderController}