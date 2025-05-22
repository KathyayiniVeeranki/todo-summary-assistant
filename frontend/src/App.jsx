import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import SummaryButton from "./components/SummaryButton";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">📝 Todo Summary Assistant</h1>
      <AddTodo refresh={loadTodos} />
      <TodoList todos={todos} refresh={loadTodos} />
      <SummaryButton />
    </div>
  );
}

export default App;
