import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
  sub: string;
}
export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //Receber o token
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  //Separar o Bearer que vem junto do token
  const [, token] = authToken.split(" ");

  try {
    //Validar o token
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

    // tem que criar um tipo personalizado na pasta @types e editar o arquivo TS o "typeRoots" apontando o arquivo do tipo  "./src/@types"
    req.user_id = sub;

    //Já que o token e valido pode prosseguir
    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
