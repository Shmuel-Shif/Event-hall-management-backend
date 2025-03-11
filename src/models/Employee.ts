export enum EmployeeRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  WAITER = 'WAITER',
  BARTENDER = 'BARTENDER',
  KITCHEN = 'KITCHEN'
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: EmployeeRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
} 