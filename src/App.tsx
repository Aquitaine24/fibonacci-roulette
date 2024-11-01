import { useState } from "react";
import "./App.css";

function generateFibonacci(n: number, startingBet: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, startingBet];

  const fibonacci: number[] = [0, startingBet];

  for (let i = 2; i < n; i++) {
    fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
  }

  return fibonacci;
}

function sumFibonacci(sequence: number[]): number {
  return sequence.reduce((acc, num) => acc + num, 0);
}

function calculatePayout(sequence: number[]): number[] {
  const payouts: number[] = [];
  let previousBetsTotal = 0;

  for (let i = 0; i < sequence.length; i++) {
    const payout = sequence[i] * 3 - previousBetsTotal;
    payouts.push(payout);
    previousBetsTotal += sequence[i];
  }

  return payouts;
}

function App() {
  const [userNumber, setUserNumber] = useState<number>(11);
  const [start, setStart] = useState<number>(1);
  const [sequence, setSequence] = useState<number[]>(
    generateFibonacci(userNumber, start)
  );
  const [sum, setSum] = useState<number>(sumFibonacci(sequence));
  const [payouts, setPayouts] = useState<number[]>(calculatePayout(sequence));

  const handleGenerate = () => {
    const newSequence = generateFibonacci(userNumber, start);
    setSequence(newSequence);
    setSum(sumFibonacci(newSequence));
    setPayouts(calculatePayout(newSequence)); // Calculate new payouts
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Fibonacci Betting Calculator
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Number of Bets:
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
            Starting Bet:
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

      <h2 className="text-2xl font-semibold text-gray-800 mt-8">Place Bets:</h2>
      <p className="text-gray-700 text-center mt-4 bg-gray-200 p-4 rounded-lg max-w-lg w-full">
        {sequence.map((num) => `$${num}`).join(", ")}
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8">
        Money Required:
      </h2>
      <p className="text-gray-700 text-center mt-4 bg-gray-200 p-4 rounded-lg max-w-lg w-full">
        ${sum}
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8">Payouts:</h2>
      <p className="text-gray-700 text-center mt-4 bg-gray-200 p-4 rounded-lg max-w-lg w-full">
        {payouts.map((payout) => `$${payout}`).join(", ")}
      </p>
    </div>
  );
}

export default App;
