"use client";

import { useEffect, useRef } from "react";

export default function ConfettiExplosion() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const colors = ["#00c2ff", "#f7ff00", "#ff4e00", "#e600ff", "#00ff8f"];
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random()}s`;
      ref.current.appendChild(confetti);
    }

    const cleanup = setTimeout(() => {
      if (ref.current) ref.current.innerHTML = "";
    }, 2000);

    return () => clearTimeout(cleanup);
  }, []);

  return <div className="confetti-wrapper" ref={ref} />;
}