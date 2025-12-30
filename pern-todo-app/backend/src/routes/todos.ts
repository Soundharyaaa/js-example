import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

interface Todo {
  todo_id?: number;
  description: string;
  completed: boolean;
}
router.post('/', async (req: Request, res: Response) => {
  try {
    const { description, completed }: Todo = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
      [description, completed || false]
    );
    res.json(newTodo.rows[0]);
  } catch (err: unknown) {
     if (err instanceof Error) {
    console.log(err.message);
  }
    res.status(500).send("Server Error");
  }
});


router.get('/', async (req: Request, res: Response) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err: unknown) {
     if (err instanceof Error) {
    console.log(err.message);
  }
    res.status(500).send("Server Error");
  }
});


router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description, completed }: Todo = req.body;

    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
      [description, completed, id]
    );

    res.json({
      message: "Todo was updated!",
      todo: updatedTodo.rows[0],
    });
  } catch (err: unknown) {
     if (err instanceof Error) {
    console.log(err.message);
  }
    res.status(500).send("Server Error");
  }
});


router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
if (isNaN(id)) {
      return res.status(400).json("Invalid todo ID");
    }

   const result=await deletetodo(id);
   if (result.rowCount === 0) {
      return res.status(404).json("Todo not found");
    }

   res.json({ message: "Todo was deleted!" });
    
} catch (err:unknown) {
    if(err instanceof Error){
      console.log(err.message)
    }
    res.status(500).json("Server error");
  }
});

export const deletetodo=async(id:number)=>{
  
    const result = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
      [id]
    );

    return result;
    
}
export default router;