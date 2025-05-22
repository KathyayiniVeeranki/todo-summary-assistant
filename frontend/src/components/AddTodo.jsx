import { useState } from "react";
import axios from "axios";

export default function AddTodo({ refresh }) {
  const [text, setText] = useState("");

  const handleAdd = async () => {
    if (!text.trim()) return;
    await axios.post("http://localhost:5000/todos", { text });
    setText("");
    refresh();
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border p-2 flex-1 rounded"
        placeholder="Enter a new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
        Add
      </button>
    </div>
  );
}
