"use client";

import { useEffect, useState } from "react";
import { transactions as easyTransactions } from "@/data/transactions";
import { nightmareTransactions } from "@/data/nightmareTransactions";
import Card from "@/components/Card";
import ChoiceList from "@/components/ChoiceList";
import ConfettiExplosion from "@/components/ConfettiExplosion";
import { motion, AnimatePresence } from "framer-motion";

export default function GamePage() {
  const [hasStarted, setHasStarted] = useState(false);
  const startGame = () => {
    setHasStarted(true);
  };  
  const [isNightmareMode, setIsNightmareMode] = useState(false);
  const [isNightmareUnlocked, setIsNightmareUnlocked] = useState(false);

  const [transactions, setTransactions] = useState(easyTransactions);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shakeCard, setShakeCard] = useState(false);

  const [scoreBreakdown, setScoreBreakdown] = useState<null | { base: number; bonus: number }>(null);

  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timesUp, setTimesUp] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const resetGame = () => {
    const shuffled = [...easyTransactions].sort(() => Math.random() - 0.5);
  
    setIndex(0);
    setScore(0);
    setFlipped(false);
    setTimeLeft(15); // or whatever your base time is
    setTimerRunning(true);
    setShowConfetti(false);
    setErrorMessage("");
    setTimesUp(false);
    setTransactions(shuffled);
    setIsNightmareMode(false);
    setIsNightmareUnlocked(false);
  };  

  const tx = transactions[index];

  useEffect(() => {
    const shuffled = [...easyTransactions].sort(() => Math.random() - 0.5);
    setTransactions(shuffled);
  }, []);

  useEffect(() => {
  if (!hasStarted || !tx) return;

  const timePerCard = isNightmareMode ? 20 : 15;
  setTimeLeft(timePerCard);
  setTimerRunning(true);
  setTimesUp(false); // ✅ Reset timesUp whenever a new card loads

  const interval = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        setTimerRunning(false);
        setTimesUp(true); // ✅ Replace alert with toast trigger
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval); // cleanup on next question
}, [index, isNightmareMode, hasStarted, tx]);

  const [isCardVisible, setIsCardVisible] = useState(true); // NEW

  const handleChoice = (choice: string) => {
    if (!tx) return;
    const isCorrect = choice === tx.correct;
  
    if (isCorrect) {
      const bonus = timeLeft;
      setScore((prev) => prev + 1 + bonus);
      setScoreBreakdown({ base: 1, bonus });
      setTimerRunning(false);
      setFlipped(true);
      setShowConfetti(true);
  
      setTimeout(() => {
        setFlipped(false);
        setShowConfetti(false);
        setScoreBreakdown(null);
  
        setTimeout(() => {
          setIndex((prev) => prev + 1);
        }, 800);
      }, 2300);
    } else {
      setErrorMessage("Not this one!");
      setShakeCard(true); // ⏳ trigger shake
  
      setTimeout(() => {
        setErrorMessage(""); 
        setShakeCard(false); // ✅ stop shake after animation
      }, 800);
    }
  };  

  if (!hasStarted) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#f4f4f4] p-8 text-center">
        <motion.img
          src="/Card-Front.svg"
          alt="Card"
          className="w-[450px] h-auto cursor-pointer mb-8"
          whileHover={{
            y: -12,
            scale: 1.03,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 8,
          }}
        />
        <motion.button
          onClick={startGame}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white font-semibold px-6 py-3 rounded-md font-medium tracking-wide"
        >
          Start game 🎲
        </motion.button>
        <p className="mt-3 text-gray-500 text-sm max-w-md">
            Match the undecoded transaction with its human-readable description. Flip the card to reveal the truth 🧠
        </p>
      </main>
    );
  }

  if (!tx) {
    if (!isNightmareMode && index === 5 && !isNightmareUnlocked) {
      return (
        <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold tracking-tight"
          >
            😈 Nightmare Mode Unlocked 😈
          </motion.h1>
          <p className="text-lg text-gray-400">Let’s see how far your decoding powers really go.</p>
          <button
            className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
            onClick={() => {
              const shuffled = [...nightmareTransactions].sort(() => Math.random() - 0.5);
              const timePerCard = isNightmareMode ? 20 : 15;
              setTransactions(shuffled);
              setIndex(0);
              setScore(0);
              setFlipped(false);
              setIsNightmareMode(true);
              setIsNightmareUnlocked(true);
            }}
          >
            Enter the Darkness
          </button>
        </main>
      );
    }
    
        return (
            <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                transition={{ duration: 0.9 }}
                className="text-5xl font-extrabold text-center drop-shadow-lg"
              >
                🔥 YOU WIN 🔥
              </motion.h1>
              <p className="text-lg text-gray-400 mt-2">You decoded all Safe transactions, chain whisperer. Want to try again?</p>
              <p className="text-md font-mono text-gray-200">👑 Final Score: {score} 👑</p>
              <button
                onClick={resetGame}
                className="mt-4 bg-white text-black font-semibold px-5 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
              >
                Play Again 🔁
              </button>

              {/* Animated falling cards */}
              {[...Array(12)].map((_, i) => (
                <motion.img
                  key={i}
                  src="/Card-Back-Decoded-1.svg"
                  className="w-24 h-auto absolute top-[-100px]"
                  style={{ left: `${Math.random() * 100}%` }}
                  animate={{ y: "120vh", rotate: 360 }}
                  transition={{
                    delay: i * 0.3,
                    duration: 4 + Math.random(),
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
              ))}
            </main>
        );
    }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 relative bg-[#ffffff]">
      
      {/* Timer */}
      <div className="absolute top-6 left-6 text-md font-mono text-gray-700">
        ⏱️ Time: {timeLeft}s
      </div>
  
      {/* Score */}
      <div className="absolute top-6 right-6 text-md font-mono text-gray-700 flex flex-col items-end">
        🧠 Score: {score}
        {scoreBreakdown && (
          <div className="text-green-600 text-sm animate-pulse">
            +{scoreBreakdown.base} ✅ +{scoreBreakdown.bonus} ⚡
            </div>
        )}
      </div>
  
      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tx.svgId}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -30 }}
          transition={{ duration: 0.4 }}
          className="relative z-10"
        >
          <Card
            svgId={tx.svgId}
            decoded={tx.correct}
            flipped={flipped}
            isNightmareMode={isNightmareMode}
            shake={shakeCard}
          />
        </motion.div>
      </AnimatePresence>

      {errorMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-red-50 text-red-600 border border-red-100 rounded-xl px-6 py-2 shadow-sm animate-fade-in-out">
         {errorMessage}
        </div>
      )}
      
      {timesUp && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-yellow-50 text-yellow-800 border border-yellow-100 rounded-xl px-6 py-2 shadow-sm">
            ⏱️ Time's up!
            <button
              onClick={resetGame}
              className="ml-3 text-md font-semibold hover:text-yellow-600 hover:text-yellow-900 transition"
            >
              Play again
            </button>
        </div>
      )}

      {/* Choices */}
      <ChoiceList choices={tx.choices} onSelect={handleChoice} />
  
      {/* Confetti */}
      {showConfetti && <ConfettiExplosion />}
    </main>
  );  
}