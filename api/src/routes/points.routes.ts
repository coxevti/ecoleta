import { Router } from 'express';
import CreatePointService from '../services/CreatePointService';
import ListPointService from '../services/ListPointService';
import ShowPointService from '../services/ShowPointService';

const pointsRouter = Router();

pointsRouter.get('/', async (req, res) => {
  const { city, uf, items } = req.query;
  const listPointService = new ListPointService();
  const points = await listPointService.execute({
    city,
    uf,
    items,
  });
  return res.json({ points });
});

pointsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const showPointService = new ShowPointService();
  const point = await showPointService.execute({
    id,
  });
  return res.json({ point });
});

pointsRouter.post('/', async (req, res) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  } = req.body;
  const createPointService = new CreatePointService();
  const point = await createPointService.execute({
    image: 'image',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  });
  return res.json({ point });
});

export default pointsRouter;
