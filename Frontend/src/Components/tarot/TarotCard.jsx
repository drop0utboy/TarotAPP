import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function TarotCard({ 
  card, 
  isRevealed, 
  onReveal, 
  position = "center",
  delay = 0 
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (!isRevealed) {
      setIsFlipped(true);
      setTimeout(() => onReveal(), 600);
    }
  };

  const cardBacks = [
    "bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800",
    "bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900",
    "bg-gradient-to-br from-purple-800 via-indigo-800 to-purple-900"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="relative"
    >
      <div
        className={`relative w-32 h-48 md:w-40 md:h-60 cursor-pointer transition-transform duration-300 hover:scale-105 ${
          !isRevealed ? "hover:shadow-2xl" : ""
        }`}
        style={{ perspective: "1000px" }}
        onClick={handleClick}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isRevealed ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Card Back */}
          <Card
            className={`absolute inset-0 w-full h-full ${cardBacks[0]} mystical-border card-glow`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-1 w-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded mx-auto"></div>
                  <div className="h-1 w-8 bg-gradient-to-r from-purple-400 to-indigo-500 rounded mx-auto"></div>
                  <div className="h-1 w-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded mx-auto"></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Card Front */}
          <Card
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-100 to-purple-50 mystical-border overflow-hidden"
            style={{ 
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {card?.name?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gradient-to-r from-purple-400 to-indigo-500 rounded"></div>
                    <div className="h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded"></div>
                    <div className="h-2 bg-gradient-to-r from-purple-400 to-indigo-500 rounded"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <h3 className="font-bold text-gray-800 text-sm mystical-title">
                  {card?.name || "Mystery Card"}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {card?.suit || "Major Arcana"}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}