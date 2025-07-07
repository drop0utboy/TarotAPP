import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const spreads = [
  {
    type: "single",
    name: "Single Card",
    description: "Quick daily guidance",
    cards: 1,
    ideal: "Daily insight, simple questions",
    icon: "●"
  },
  {
    type: "three_card",
    name: "Three Card Spread",
    description: "Past, Present, Future",
    cards: 3,
    ideal: "Life transitions, decision making",
    icon: "● ● ●"
  },
  {
    type: "celtic_cross",
    name: "Celtic Cross",
    description: "Comprehensive life reading",
    cards: 10,
    ideal: "Deep insights, complex situations",
    icon: "✚"
  }
];

export default function SpreadSelector({ onSelectSpread }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mystical-title text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Choose Your Spread
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-purple-200 text-lg"
        >
          Select the reading that resonates with your current need
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {spreads.map((spread, index) => (
          <motion.div
            key={spread.type}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full bg-black/20 mystical-border backdrop-blur-sm hover:bg-black/30 transition-all duration-300 group cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  {spread.icon}
                </div>
                <CardTitle className="text-white mystical-title text-xl">
                  {spread.name}
                </CardTitle>
                <p className="text-purple-200 text-sm">
                  {spread.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Cards:</span>
                    <Badge variant="outline" className="text-purple-200 border-purple-400">
                      {spread.cards}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-400">
                    <span className="font-medium">Ideal for:</span> {spread.ideal}
                  </div>
                </div>
                
                <Button
                  onClick={() => onSelectSpread(spread.type)}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Begin Reading
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}