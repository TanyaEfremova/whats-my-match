"use client";

import { useState } from "react";
import { transactions } from "@/data/transactions";
import Card from "@/components/Card";
import ChoiceList from "@/components/ChoiceList";

export default function GamePage() {
  const [index, setIndex] = useState(0);
  const tx = transactions[index];

  const handleChoice = (choice: string) => {
    const isCorrect = choice === tx.correct;
    alert(isCorrect ? "✅ Correct!" : "❌ Try again");
    if (isCorrect && index < transactions.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      <Card raw={tx.raw} />
      <ChoiceList choices={tx.choices} onSelect={handleChoice} />
    </main>
  );
}