import { getFirestore } from 'firebase-admin/firestore';
import { Employee } from '../models/Employee';
import { Task } from '../models/Task';
import { Attendance } from '../models/Attendance';

const db = getFirestore();

export const Collections = {
  EMPLOYEES: 'employees',
  TASKS: 'tasks',
  ATTENDANCE: 'attendance'
} as const;

export const FirebaseService = {
  // Employee methods
  async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    const docRef = await db.collection(Collections.EMPLOYEES).add({
      ...employee,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { ...employee, id: docRef.id } as Employee;
  },

  async getEmployee(id: string): Promise<Employee | null> {
    const doc = await db.collection(Collections.EMPLOYEES).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } as Employee : null;
  },

  // Task methods
  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const docRef = await db.collection(Collections.TASKS).add({
      ...task,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { ...task, id: docRef.id } as Task;
  },

  async updateTaskStatus(id: string, status: Task['status']): Promise<void> {
    await db.collection(Collections.TASKS).doc(id).update({
      status,
      updatedAt: new Date(),
      ...(status === 'COMPLETED' ? { completedAt: new Date() } : {})
    });
  },

  // Attendance methods
  async recordAttendance(attendance: Omit<Attendance, 'id'>): Promise<Attendance> {
    const docRef = await db.collection(Collections.ATTENDANCE).add(attendance);
    return { ...attendance, id: docRef.id } as Attendance;
  }
}; 