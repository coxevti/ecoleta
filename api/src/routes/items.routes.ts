import { Router } from 'express';
import CreateItemService from '../services/CreateItemService';
import ListItemService from '../services/ListItemService';

const itemsRouter = Router();

itemsRouter.get('/', async (req, res) => {
  const listItemService = new ListItemService();
  const items = await listItemService.execute();
  return res.json({ items });
});

itemsRouter.post('/', async (req, res) => {
  const { image, name } = req.body;
  const createItemService = new CreateItemService();
  const item = await createItemService.execute({ image, name });
  return res.json({ item });
});

export default itemsRouter;
