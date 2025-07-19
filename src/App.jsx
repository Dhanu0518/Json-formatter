import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [livePreview, setLivePreview] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const formatJson = (value) => {
    try {
      const json = JSON.parse(value);
      return JSON.stringify(json, null, 2);
    } catch {
      return "❌ Invalid JSON!";
    }
  };

  const handleFormat = () => {
    const formatted = formatJson(input);
    setOutput(formatted);
    if (formatted.startsWith("❌")) {
      toast.error("Invalid JSON!");
    } else {
      toast.success("JSON formatted!");
    }
  };

  const handleCopy = async () => {
    if (!output || output.startsWith("❌")) return;
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to Clipboard!");
    } catch {
      toast.error("Failed to copy!");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  // Live preview effect
  useEffect(() => {
    if (livePreview) {
      setOutput(formatJson(input));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, livePreview]);

  return (
    <>
      <Toaster position="bottom-center" />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 flex flex-col items-center transition-colors duration-300">
        {/* Header */}
        <div className="flex justify-between w-full max-w-3xl mb-6 items-center">
          <h1 className="text-3xl font-bold flex items-center">
            🛠 <span className="ml-2">React JSON Formatter</span>
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-auto px-3 py-1.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center"
          >
            <span className="text-xl">{darkMode ? "☀️" : "🌙"}</span>
          </button>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full max-w-3xl h-48 p-4 border rounded-lg mb-4 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400  resize-none transition-colors duration-200"
          placeholder="Paste your JSON here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Controls */}
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={handleFormat}
            className="px-5 py-1 rounded-lg bg-[#113F67] text-white hover:bg-blue-700 active:scale-95 transition transform shadow"
          >
            Format
          </button>
          <button
            onClick={handleCopy}
            className="px-5 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700 active:scale-95 transition transform shadow"
          >
            Copy
          </button>
          <button
            onClick={handleClear}
            className="px-5 py-1 rounded-lg bg-gray-400 text-black hover:bg-gray-500 active:scale-95 transition transform shadow"
          >
            Clear
          </button>
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input
              type="checkbox"
              checked={livePreview}
              onChange={() => setLivePreview(!livePreview)}
              className="accent-blue-600"
            />
            Live Preview
          </label>
        </div>

        {/* Output */}
        <pre className="w-full max-w-3xl bg-gray-100 dark:bg-gray-800 p-4 border rounded-lg shadow-inner overflow-auto text-gray-900 dark:text-gray-100 transition-colors duration-200">
          {output}
        </pre>
      </div>
    </>
  );
}
