import { useState } from "react";
import axios from "axios";

export default function TodoList({ todos, refresh }) {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    refresh();
  };

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:5000/todos/${id}`, { text: editText });
    setEditId(null);
    setEditText("");
    refresh();
  };

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo.id} className="bg-gray-100 p-2 rounded flex justify-between items-center">
          {editId === todo.id ? (
            <>
              <input
                className="flex-1 p-1 border rounded mr-2"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handleUpdate(todo.id)} className="text-green-600 font-medium mr-2">Save</button>
              <button onClick={() => setEditId(null)} className="text-gray-500">Cancel</button>
            </>
          ) : (
            <>
              <span>{todo.text}</span>
              <div className="space-x-3">
                <button onClick={() => handleEdit(todo)} className="text-blue-500">Edit</button>
                <button onClick={() => handleDelete(todo.id)} className="text-red-500">Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
