import express, { Application } from 'express';
import cors from 'cors';
import todoRoutes from './routes/todos';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/todos", todoRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;