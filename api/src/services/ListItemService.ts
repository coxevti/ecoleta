import { getRepository } from 'typeorm';
import Item from '../entity/Item';

interface SerializedItem extends Item {
  imageUrl: string;
}

class ListItemService {
  public async execute(): Promise<Item[]> {
    const itemsRepository = getRepository(Item);
    const items = await itemsRepository.find();
    const serializedItem = items.map(item => {
      return {
        id: item.id,
        name: item.name,
        imageUrl: `${process.env.SITE_BASE_URL}/uploads/${item.image}`,
      } as SerializedItem;
    });
    return serializedItem;
  }
}

export default ListItemService;
