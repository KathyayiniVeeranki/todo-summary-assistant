import axios from "axios";
import { useState } from "react";

export default function SummaryButton() {
  const [status, setStatus] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSummary = async () => {
    setStatus("Generating summary...");
    setIsGenerating(true);
    try {
      const res = await axios.post("http://localhost:5000/summarize");
      setStatus("✅ Summary sent to Slack!");
      setTimeout(() => setStatus(""), 3000);
    } catch (e) {
      setStatus("❌ Failed to send summary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleSummary}
        disabled={isGenerating}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all flex items-center justify-center ${isGenerating ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'}`}
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Summarize & Send to Slack
          </>
        )}
      </button>
      {status && (
        <p className={`mt-2 text-sm text-center ${status.startsWith('✅') ? 'text-green-600' : 'text-red-600'} animate-pulse`}>
          {status}
        </p>
      )}
    </div>
  );
}