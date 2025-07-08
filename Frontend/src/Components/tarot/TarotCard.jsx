// src/Components/tarot/TarotCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TarotCard({
  card = {},
  isRevealed = false,
  onReveal = () => {},
  position = "center",
  delay = 0,
}) {
  const [flipped, setFlipped] = useState(false);

  const backs = {
    left:   "from-purple-900 via-indigo-900 to-purple-800",
    center: "from-indigo-900 via-purple-900 to-blue-900",
    right:  "from-purple-800 via-indigo-800 to-purple-900",
  };

  const Front = () =>
    card.imageUrl ? (
      <img
        src={card.imageUrl}
        alt={card.name}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
    ) : (
      <div className="flex flex-col items-center justify-center h-full bg-gray-100">
        <div className="w-16 h-16 mb-3 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            {card.name?.charAt(0) || "?"}
          </span>
        </div>
        <div className="space-y-1 w-3/4">
          <div className="h-2 bg-gradient-to-r from-purple-400 to-indigo-500 rounded" />
          <div className="h-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded" />
          <div className="h-2 bg-gradient-to-r from-purple-400 to-indigo-500 rounded" />
        </div>
      </div>
    );

  const handleClick = () => {
    if (!isRevealed) {
      setFlipped(true);
      setTimeout(onReveal, 600);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      style={{ width: "8rem", height: "12rem", flex: "0 0 auto" }}
    >
      <div
        className={`relative w-full h-full cursor-pointer transition-transform duration-300 ${!isRevealed ? "hover:scale-105 hover:shadow-2xl" : ""}`}
        style={{ perspective: "1000px" }}
        onClick={handleClick}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped || isRevealed ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back */}
          <div
            className={`absolute inset-0 rounded-lg bg-gradient-to-br ${backs[position]} border border-purple-500/60`}
            style={{ backfaceVisibility: "hidden" }}
          />

          {/* Front */}
          <div
            className="absolute inset-0 bg-slate-50 rounded-lg overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <Front />
            <div className="absolute bottom-2 inset-x-0 px-2 text-center">
              <h3 className="font-bold text-gray-800 text-sm truncate">
                {card.name || "Mystery Card"}
              </h3>
              <p className="text-xs text-gray-600">
                {card.suit || "Major Arcana"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
