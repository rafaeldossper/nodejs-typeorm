import { Router } from "express";
import MatchController from "../controllers/MatchController";

const routes = Router();

routes.get('/', MatchController.matchList);
routes.get('/:id', MatchController.matchById);
routes.post('/', MatchController.create);
routes.put('/', MatchController.matchUpdate);
routes.delete('/', MatchController.deleteMatch);

export default routes;