"use client";

import "@/styles/card.css";
import { motion } from "framer-motion";

type Props = {
  svgId: number;
  decoded: string;
  flipped: boolean;
  isNightmareMode?: boolean;
  shake?: boolean; 
};

export default function Card({ svgId, decoded, flipped, isNightmareMode = false, shake = false }: Props) {

  const svgPrefix = isNightmareMode ? "Nightmare-Card-Back" : "Card-Back";

  return (
    <motion.div
      className="card-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: typeof shake === "boolean" && shake
        ? [0, -8, 8, -6, 6, -4, 4, 0]
        : 0,
      }}
      whileHover={{ rotateX: 3, rotateY: -3, y: -10, scale: 1.02 }}
      transition={{ 
        type: shake ? "tween" : "spring",
        duration: shake ? 0.6 : 0.4,
        stiffness: 150, 
        damping: 10 
    }}
    >
      <motion.div
        className={`card-inner ${flipped ? "flipped" : ""}`}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Front - Decoded Side */}
        <div className="card-face card-front border border-gray-200 shadow-[0_6px_20px_rgba(0,0,0,0.10)] rounded-lg overflow-hidden bg-white">
          <img
            src={`/${svgPrefix}-Decoded-${svgId}.svg`}
            alt={`Card ${svgId} - Decoded`}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        {/* Back - Human-readable Side */}
        <div className="card-face card-back border border-gray-200 shadow-[0_6px_20px_rgba(0,0,0,0.10)] rounded-lg overflow-hidden bg-white">
          <img
            src={`/${svgPrefix}-Human-${svgId}.svg`}
            alt={`Card ${svgId} - Human`}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}