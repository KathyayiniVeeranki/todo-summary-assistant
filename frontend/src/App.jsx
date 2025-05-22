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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-3xl font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Todo Summary Assistant
          </h1>
          <p className="text-blue-100 mt-1">Organize your tasks efficiently</p>
        </div>
        
        <div className="p-6">
          <AddTodo refresh={loadTodos} />
          <TodoList todos={todos} refresh={loadTodos} />
          <SummaryButton />
        </div>
        
        <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500 border-t">
          <p>Double click to edit tasks • {todos.length} {todos.length === 1 ? 'task' : 'tasks'} in total</p>
        </div>
      </div>
    </div>
  );
}

export default App;