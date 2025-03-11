import { Request, Response } from 'express';
import { FirebaseService } from '../services/firebase';
import { Employee, EmployeeRole } from '../models/Employee';

export const EmployeeController = {
  async createEmployee(req: Request, res: Response) {
    try {
      const employeeData: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'> = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        role: req.body.role as EmployeeRole,
        isActive: true
      };

      const employee = await FirebaseService.createEmployee(employeeData);
      res.status(201).json(employee);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create employee' });
    }
  },

  async getEmployee(req: Request, res: Response) {
    try {
      const employee = await FirebaseService.getEmployee(req.params.id);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get employee' });
    }
  }
}; 