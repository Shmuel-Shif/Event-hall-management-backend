import express from 'express';
import { initializeApp, cert } from 'firebase-admin/app';
import { config } from './config/env';
import employeeRoutes from './routes/employees';
import taskRoutes from './routes/tasks';
import attendanceRoutes from './routes/attendance';

// Initialize Firebase Admin
initializeApp({
  credential: cert({
    projectId: config.firebase.projectId,
    clientEmail: config.firebase.clientEmail,
    privateKey: config.firebase.privateKey,
  }),
});

const app = express();

app.use(express.json());

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/attendance', attendanceRoutes);

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 