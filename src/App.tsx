import { useState } from "react";
import "./App.css";

function generateFibonacci(n: number, startingbet: number): string {
  if (n <= 0) return "";
  if (n === 1) return "0";
  if (n === 2) return "0, ${startingbet}";

  const fibonacci: number[] = [0, startingbet];

  for (let i = 2; i < n; i++) {
    fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
  }

  return fibonacci.join(", ");
}

function App() {
  const [userNumber, setUserNumber] = useState<number>(10); // Default value for terms
  const [start, setStart] = useState<number>(2); // Default starting number
  const [sequence, setSequence] = useState<string>(
    generateFibonacci(userNumber, start)
  );
  const handleGenerate = () => {
    setSequence(generateFibonacci(userNumber, start));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Fibonacci Sequence Generator
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Number of Terms:
          </label>
          <input
            type="number"
            value={userNumber}
            onChange={(e) => setUserNumber(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Starting Number:
          </label>
          <input
            type="number"
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Generate Sequence
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8">Sequence:</h2>
      <p className="text-gray-700 text-center mt-4 bg-gray-200 p-4 rounded-lg max-w-lg w-full">
        {sequence}
      </p>
    </div>
  );
}

export default App;
