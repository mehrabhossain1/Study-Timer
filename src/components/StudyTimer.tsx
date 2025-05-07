import { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface StudySession {
  duration: number;
  createdAt: string;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export default function StudyTimer() {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [history, setHistory] = useState<StudySession[]>(() => {
    const stored = localStorage.getItem("studyHistory");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const saveSession = () => {
    if (seconds === 0) return;

    const newSession: StudySession = {
      duration: seconds,
      createdAt: new Date().toISOString(),
    };
    const updated = [newSession, ...history];
    setHistory(updated);
    localStorage.setItem("studyHistory", JSON.stringify(updated));
    resetTimer();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ⏱️ Study Timer
        </h1>

        <div className="text-center mb-6">
          <div className="text-6xl font-mono text-blue-700">
            {formatTime(seconds)}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Stay focused and track your time
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={toggleTimer}
            className={`px-6 py-2 text-white font-semibold rounded-full shadow transition-all ${
              isRunning
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button
            onClick={resetTimer}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-full shadow"
          >
            Reset
          </Button>
          <Button
            onClick={saveSession}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow"
          >
            Save
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            📚 Session History
          </h2>
          {history.length === 0 ? (
            <p className="text-gray-400">No sessions saved yet.</p>
          ) : (
            <ul className="max-h-40 overflow-y-auto space-y-1 text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded">
              {history.map((session, index) => (
                <li key={index} className="border-b pb-1">
                  {formatTime(session.duration)} —{" "}
                  <span className="text-gray-500">
                    {new Date(session.createdAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
