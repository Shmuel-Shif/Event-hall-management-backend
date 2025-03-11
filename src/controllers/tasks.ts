import { Request, Response } from 'express';
import { FirebaseService } from '../services/firebase';
import { Task, TaskStatus, TaskPriority } from '../models/Task';

export const TaskController = {
  async createTask(req: Request, res: Response) {
    try {
      const taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completedAt'> = {
        title: req.body.title,
        description: req.body.description,
        assignedTo: req.body.assignedTo,
        assignedBy: req.user.uid, // מהטוקן של המשתמש
        status: TaskStatus.PENDING,
        priority: req.body.priority as TaskPriority,
        dueDate: new Date(req.body.dueDate)
      };

      const task = await FirebaseService.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  },

  async updateTaskStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      await FirebaseService.updateTaskStatus(id, status as TaskStatus);
      res.json({ message: 'Task status updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task status' });
    }
  }
}; 