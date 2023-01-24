import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors'

import cors from 'cors';

import {router} from './router'


const app = express();

app.use(express.json())

//Configurando o CORS para qualquer Ip acessar a API
app.use(cors())

app.use(router);




//Tratando exeções com a Lib express-async-errros
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{

    //Se for uma instancia do tipo error
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: "Internal server error."
    })
})




//Configuração do server
app.listen(3333, ()=>{
    console.log("server online")
})