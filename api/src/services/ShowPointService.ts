import { getRepository } from 'typeorm';
import Point from '../entity/Point';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class ShowPointService {
  public async execute({ id }: Request): Promise<Point> {
    const pointsRepository = getRepository(Point);
    const point = await pointsRepository.findOne(id, { relations: ['items'] });
    if (!point) {
      throw new AppError('Id ponto não encontrado');
    }
    return point;
  }
}

export default ShowPointService;
