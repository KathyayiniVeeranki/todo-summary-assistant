import { useState } from "react";
import axios from "axios";

export default function AddTodo({ refresh }) {
  const [text, setText] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!text.trim()) return;
    setIsAdding(true);
    try {
      await axios.post("http://localhost:5000/todos", { text });
      setText("");
      refresh();
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          className="border-2 border-gray-200 p-3 flex-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="✏️ What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button 
          onClick={handleAdd} 
          disabled={isAdding}
          className={`px-6 rounded-lg font-medium transition-all ${isAdding ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white flex items-center`}
        >
          {isAdding ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </>
          ) : 'Add'}
        </button>
      </div>
    </div>
  );
}