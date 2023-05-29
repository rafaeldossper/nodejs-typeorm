import { Router, Request, Response } from "express";
import teams from './teams';
import matches from './matches';

const routes = Router();

routes.use("/team", teams);
routes.use("/match", matches);



//aceita qualquer método HTTP ou URL
routes.use( (req:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;
