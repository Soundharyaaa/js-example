import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { MdModeEditOutline, MdOutlineDone } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { API_URL } from "./api";
interface Todo {
  todo_id: number;
  description: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [edit, setEdit] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<Todo[]>(`${API_URL}/todos`);
      setTasks(res.data);
      console.log(res.data);
    } catch (err: unknown) {
       if (err instanceof Error) {
    console.log(err.message);
  }
      setError("Failed to fetch todos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description.trim()) return;
    try {
      setError(null);
      const res = await axios.post<Todo>(`${API_URL}/todos`, {
        description: description.trim(),
        completed: false,
      });
      setTasks([...tasks, res.data]);
      setDescription("");
    } catch (err: unknown) {
       if (err instanceof Error) {
    console.log(err.message);
  }
      setError("Failed to add todo. Please try again.");
    }
  };

  const saveEdit = async (id: number) => {
    try {
      setError(null);

      const currentTodo = tasks.find((task) => task.todo_id === id);
      if (!currentTodo) return;

      const trimmedText = editedText.trim();
      if (currentTodo.description === trimmedText) {
        setEdit(null);
        setEditedText("");
        return;
      }

      await axios.put(`${API_URL}/todos/${id}`, {
        description: trimmedText,
      });

      setEdit(null);
      setEditedText("");
      setTasks(
        tasks.map((task) =>
          task.todo_id === id
            ? { ...task, description: trimmedText, completed: currentTodo.completed }
            : task
        )
      );
    } catch (err: unknown) {
       if (err instanceof Error) {
    console.log(err.message);
  }
      setError("Failed to update todo. Please try again.");
    }
  };

   const deleteTodo = async (id: number) => {
    try {
      setError(null);
      await axios.delete(`${API_URL}/todos/${id}`);
      setTasks(tasks.filter((task) => task.todo_id !== id));
    } catch (err: unknown) {
       if (err instanceof Error) {
    console.log(err.message);
  }
      setError("Failed to delete todo. Please try again.");
    }
  };

  const toggleCompleted = async (id: number) => {
    try {
      setError(null);
      const todo = tasks.find((task) => task.todo_id === id);
      if (!todo) return;

      await axios.put(`${API_URL}/todos/${id}`, {
        description: todo.description,
        completed: !todo.completed,
      });

      setTasks(
        tasks.map((task) =>
          task.todo_id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (err: unknown) {
       if (err instanceof Error) {
    console.log(err.message);
  }
      setError("Failed to update todo. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-center p-4">
      <div className="bg-gray-50 rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">PERN TODO APP</h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form
          onSubmit={onSubmitForm}
          className="flex items-center gap-2 shadow-sm border p-2 rounded-lg mb-6"
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
            type="text"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            placeholder="What needs to be done?"
            required
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer">
            Add Task
          </button>
        </form>
       
        <div>
          {loading ? (
            <div>
              <p className="text-gray-600">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <p className="text-gray-600">No tasks available. Add a new task!</p>
          ) : (
            <div className="flex flex-col gap-y-4">
              {tasks.map((task) => (
                <div key={task.todo_id} className="pb-4">
                  {edit === task.todo_id ? (
                    <div className="flex items-center gap-x-3">
                      <input
                        className="flex-1 p-3 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner"
                        type="text"
                        value={editedText}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setEditedText(e.target.value)
                        }
                      />
                      <div>
                        <button
                          onClick={() => saveEdit(task.todo_id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 mt-2 hover:bg-green-600 duration-200"
                        >
                          <MdOutlineDone />
                        </button>
                        <button
                          onClick={() => setEdit(null)}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg mt-2 hover:bg-gray-600 duration-200"
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-x-4 overflow-hidden">
                        <button
                          onClick={() => toggleCompleted(task.todo_id)}
                          className={`flex-shrink-0 h-6 w-6 border-2 rounded-full flex items-center justify-center ${
                            task.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-300 hover:border-blue-400"
                          }`}
                        >
                          {task.completed && <MdOutlineDone size={16} />}
                        </button>
                        <span>{task.description}</span>
                      </div>
                      <div className="flex gap-x-2">
                        <button
                          onClick={() => {
                            setEdit(task.todo_id);
                            setEditedText(task.description);
                          }}
                          className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200"
                        >
                          <MdModeEditOutline />
                        </button>
                        <button
                          onClick={() => deleteTodo(task.todo_id)}
                          className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

