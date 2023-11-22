import { NextApiRequest, NextApiResponse } from 'next';
import { createTask, getAllTasks } from './route';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    await getAllTasks(req, res);
  } else if (method === 'POST') {
    await createTask(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};