import AppDataSource from "../data-source";
import { ILike } from 'typeorm';
import { Request, Response } from 'express';
import { Team } from '../entities/Teams';


class TeamsController {

  async list(req: Request, res: Response) {
    try {
      const teamRepo = AppDataSource.manager.getRepository(Team);
      const team = await teamRepo.find({ order: { name: 'ASC' } });
      res.json(team);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro ao listar os times.' });
    }
  }
  
  async search(req: Request, res: Response) {
    try {
      const { termo } = req.params;
      const teamRepo = AppDataSource.manager.getRepository(Team);
      const teams = await teamRepo.find({
        where: { name: ILike(`%${termo}%`) },
        order: { name: 'ASC' },
      });
      if (teams.length === 0) {
        return res.status(404).json({ error: 'Nenhum time encontrado.' });
      }
  
      res.json(teams);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os times.' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const teamRepo = AppDataSource.manager.getRepository(Team);
      const existingTeam = await teamRepo.findOne({ where: { name } });

      if (existingTeam) {
        return res.status(400).json({ error: 'O nome já existe' });
      }

      const novo = teamRepo.create({ name });
      const team = await teamRepo.save(novo);

      res.json(team);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro ao criar o time.' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, name } = req.body;
      const teamRepo = AppDataSource.manager.getRepository(Team);
      
      const existingTeam = await teamRepo.findOne({ where: { id: parseInt(id) } });
  
      if (!existingTeam) {
        return res.status(404).json({ error: 'Time não encontrado.' });
      }
  
      const sameName = await teamRepo.findOne({ where: { name } });
  
      if (sameName && sameName.id !== existingTeam.id) {
        return res.status(400).json({ error: 'O nome já existe.' });
      }
  
      existingTeam.name = name;
      const updatedTeam = await teamRepo.save(existingTeam);
  
      res.json(updatedTeam);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro ao atualizar o time.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const teamRepo = AppDataSource.manager.getRepository(Team);
  
      const existingTeam = await teamRepo.findOne({ where: { id: parseInt(id) } });
      
      if (!existingTeam) {
        return res.json({ raw: [], affected: 0 });
      }
      const deleted = await teamRepo.delete(existingTeam.id);
  
  
      res.json({ raw: [], affected: deleted.affected });
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro ao excluir o time.' });
    }
  }
  

}



export default new TeamsController();