import { Request, Response } from 'express';
import { Match } from '../entities/Match';
import { Team } from '../entities/Teams';
import AppDataSource from "../data-source";
import { format } from 'date-fns';


class MatchController {
  async create(req: Request, res: Response) {
    try {
      const { idhost, idvisitor, date } = req.body;

      const hostTeam = await AppDataSource.manager.findOne(Team, { where: { id: idhost } });
      const visitorTeam = await AppDataSource.manager.findOne(Team, { where: { id: idvisitor } });

      if (!hostTeam || !visitorTeam) {
        return res.status(404).json({ error: 'Times não encontrados.' });
      }

      const match = new Match();
      match.host = hostTeam;
      match.visitor = visitorTeam;
      match.date = date;

      const matchRepo = AppDataSource.manager.getRepository(Match);
      await matchRepo.save(match);

      res.json({
        host: {
          id: hostTeam.id,
          name: hostTeam.name
        },
        visitor: {
          id: visitorTeam.id,
          name: visitorTeam.name
        },
        date,
        id: match.id
      });
    } catch (error) {
      // Tratar o erro de forma mais detalhada
      console.error("Erro ao salvar a partida:", error);
      res.status(500).json({ error: 'Ocorreu um erro ao persistir o registro de partida.' });
    }
  }

  async matchList(req: Request, res: Response) {
    try {
      const { limit, offset } = req.body;
      const parsedLimit = limit ? parseInt(limit) : undefined;
      const parsedOffset = offset ? parseInt(offset) : undefined;

      const matchRepo = AppDataSource.manager.getRepository(Match);

      const matches = await matchRepo.find({
        relations: ['host', 'visitor'],
        order: { date: 'DESC' },
        take: parsedLimit,
        skip: parsedOffset,
      });

      res.json(matches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os registros de partida.' });
    }
  }


  async matchById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const matchRepo = AppDataSource.manager.getRepository(Match);

      const matches = await matchRepo
        .createQueryBuilder('match')
        .leftJoinAndSelect('match.host', 'host')
        .leftJoinAndSelect('match.visitor', 'visitor')
        .where('match.host = :id OR match.visitor = :id', { id: Number(id) })
        .orderBy('match.date', 'DESC')
        .getMany();

      if (matches.length === 0) {
        res.status(404).json({ error: 'Nenhum resultado encontrado.' });
      } else {
        res.json(matches);
      }


    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os registros de partida.' });
    }
  }

  async matchUpdate(req: Request, res: Response) {
  try {
    const { id, idhost, idvisitor, date } = req.body;

    const matchRepo = AppDataSource.manager.getRepository(Match);
    const teamRepo = AppDataSource.manager.getRepository(Team);

    const match = await matchRepo.findOne({ where: { id } });
    if (!match) {
      return res.status(404).json({ error: "Jogo não encontrado" });
    }

    const host = await teamRepo.findOne({ where: { id: parseInt(idhost) } });
    if (!host) {
      return res.status(400).json({ error: "Mandante desconhecido" });
    }

    const visitor = await teamRepo.findOne({ where: { id: parseInt(idvisitor) } });
    if (!visitor) {
      return res.status(400).json({ error: "Visitante desconhecido" });
    }

    match.host = host;
    match.visitor = visitor;
    match.date = new Date(date);

    // Ajuste no fuso horário
    match.date.setMinutes(match.date.getMinutes() + match.date.getTimezoneOffset());

    const updatedMatch = await matchRepo.save(match);

    // Formatação da data
    const formattedDate = format(updatedMatch.date, 'yyyy-MM-dd');

    res.json({ ...updatedMatch, date: formattedDate });
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao atualizar o jogo." });
  }
}
  

  async deleteMatch(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const matchRepo = AppDataSource.manager.getRepository(Match);

      const result = await matchRepo.delete(id);

      if (result.affected === 0) {
        return res.json({ raw: [], affected: 0 });
      }

      res.json({ raw: [], affected: 1 });
    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro ao excluir o jogo." });
    }
  }


}

export default new MatchController();
