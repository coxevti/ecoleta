import { getRepository } from 'typeorm';
import Item from '../entity/Item';
import AppError from '../errors/AppError';

interface Request {
  image: string;
  name: string;
}

class CreateItemService {
  public async execute({ image, name }: Request): Promise<Item> {
    const itemsRepository = getRepository(Item);
    const checkItemExists = await itemsRepository.findOne({
      where: { name },
    });
    if (checkItemExists) {
      throw new AppError('Já existe um item cadastrada com esse nome');
    }
    const item = itemsRepository.create({ image, name });
    await itemsRepository.save(item);
    return item;
  }
}

export default CreateItemService;
