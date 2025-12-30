
import { test, expect } from "@jest/globals";
import pool from '../db';
export const deletetodo=async(id:number)=>{
  
    const result = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
      [id]
    );

    return result;
    
}
beforeEach(async () => {
  await pool.query(
    "INSERT INTO todo (todo_id, description) VALUES (19, 'Test task') ON CONFLICT DO NOTHING"
  );
});
test("Delete a valid todo", async () => {
  const result = await deletetodo(19)
  expect(result.rowCount).toBe(1);
  
  
});
  test("Delete non-existing todo", async () => {
    const result = await deletetodo(9999);
    expect(result.rowCount).toBe(0);
  });
  test("Delete with invalid ID", async () => {
    const result = await deletetodo(-1);
    expect(result.rowCount).toBe(0);
  });
 beforeEach(async () => {
  await pool.query(
    "INSERT INTO todo (todo_id, description) VALUES (19, 'Test task') ON CONFLICT DO NOTHING"
  );
});

  test("Deleted todo should return deleted row", async () => {
    const result = await deletetodo(19);
    expect(result.rows[0]).toHaveProperty("todo_id");
  });
  afterAll(async () => {
  await pool.end();  
});


