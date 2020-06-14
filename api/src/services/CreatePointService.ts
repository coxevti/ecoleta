import { getRepository } from 'typeorm';
import Item from '../entity/Item';
import Point from '../entity/Point';
import AppError from '../errors/AppError';

interface Request {
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  items: string;
}

class CreatePointService {
  public async execute({
    image,
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  }: Request): Promise<Point> {
    const pointsRepository = getRepository(Point);
    const checkEmailExists = await pointsRepository.findOne({
      where: { email },
    });
    if (checkEmailExists) {
      throw new AppError('Já existe um ponto cadastrada com esse email');
    }
    const itemsFormat = items.split(',').map(item => item.trim());
    const itemsRepository = getRepository(Item);
    const selectItem = await itemsRepository.findByIds(itemsFormat);
    const point = pointsRepository.create({
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items: selectItem,
    });
    await pointsRepository.save(point);
    return point;
  }
}

export default CreatePointService;
