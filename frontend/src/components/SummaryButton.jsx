import axios from "axios";
import { useState } from "react";

export default function SummaryButton() {
  const [status, setStatus] = useState("");

  const handleSummary = async () => {
    setStatus("Generating...");
    try {
      const res = await axios.post("http://localhost:5000/summarize");
      setStatus("✅ Sent to Slack!");
    } catch (e) {
      setStatus("❌ Failed to send summary.");
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleSummary}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Summarize & Send to Slack
      </button>
      <p className="mt-2 text-sm">{status}</p>
    </div>
  );
}
