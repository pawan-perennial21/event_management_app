// api/tasks.ts

import { NextApiRequest, NextApiResponse } from 'next';
import TaskModel from '@/models/task';

export const getAllTasks = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(200).json(tasks);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createTask = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const newTask = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      isCompleted: req.body.isCompleted,
      isImportant: req.body.isImportant,
      userId: req.body.userId,
    };

    const task = await TaskModel.create(newTask);
    res.status(201).json(task);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
