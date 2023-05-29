
import { Router } from "express";
import TeamController from "../controllers/TeamController";

const routes = Router();


routes.get('/', TeamController.list);
routes.get('/:termo', TeamController.search);
routes.post('/', TeamController.create);
// routes.post('/', TeamsController.create);
routes.put('/', TeamController.update);
routes.delete('/', TeamController.delete);

export default routes;
