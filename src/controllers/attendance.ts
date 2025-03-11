import { Request, Response } from 'express';
import { FirebaseService } from '../services/firebase';
import { AttendanceStatus } from '../models/Attendance';

export const AttendanceController = {
  async recordAttendance(req: Request, res: Response) {
    try {
      const attendanceData = {
        employeeId: req.user.uid,
        date: new Date(),
        checkIn: new Date(),
        status: AttendanceStatus.PRESENT,
        notes: req.body.notes
      };

      const attendance = await FirebaseService.recordAttendance(attendanceData);
      res.status(201).json(attendance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to record attendance' });
    }
  }
}; 