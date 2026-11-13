"use client";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleClaim = () => {
    if (!code.trim()) {
      setMessage("Please enter your code first");
      return;
    }
    setMessage("Code " + code + " claimed successfully! 🎉");
    setCode("");
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        Claim Code
      </h1>
      <p className="text-gray-400 mb-8 text-center">
        Enter your code below to claim your reward
      </p>

      <div className="w-full max-w-md bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code"
          className="w-full p-4 rounded-xl bg-black border border-zinc-700 outline-none mb-4 text-center text-lg uppercase"
        />
        <button
          onClick={handleClaim}
          className="w-full bg-white text-black font-bold p-4 rounded-xl hover:bg-gray-200"
        >
          Claim Now
        </button>
        {message && (
          <p className="text-center mt-4 text-green-400">{message}</p>
        )}
      </div>
    </main>
  );
}
