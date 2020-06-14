import { getRepository } from 'typeorm';
import Point from '../entity/Point';

interface Request {
  city: string;
  uf: string;
  items: string;
}

class ListPointService {
  public async execute({ city, uf, items }: Request): Promise<Point[]> {
    const parseItems = items.split(',').map(item => item.trim());
    const points = await getRepository(Point)
      .createQueryBuilder('points')
      .leftJoinAndSelect('points.items', 'items')
      .where('items.id IN (:...ids)', { ids: parseItems })
      .andWhere('points.city = :city', { city })
      .andWhere('points.uf = :uf', { uf })
      .getMany();
    return points;
  }
}

export default ListPointService;
