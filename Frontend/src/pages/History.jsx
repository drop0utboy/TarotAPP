import React, { useState, useEffect } from "react";
import { TarotReading } from "@/entities/TarotReading";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Sparkles, Heart, Briefcase, Star } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const moodIcons = {
  guidance: Star,
  love: Heart,
  career: Briefcase,
  spiritual: Sparkles,
  general: BookOpen
};

const spreadNames = {
  single: "Single Card",
  three_card: "Three Card Spread",
  celtic_cross: "Celtic Cross"
};

export default function History() {
  const [readings, setReadings] = useState([]);
  const [selectedReading, setSelectedReading] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReadings();
  }, []);

  const loadReadings = async () => {
    try {
      const data = await TarotReading.list("-created_date");
      setReadings(data);
    } catch (error) {
      console.error("Error loading readings:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-purple-200">Loading your readings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mystical-title text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Your Reading History
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-purple-200 text-lg mb-6"
        >
          Revisit the wisdom the cards have shared with you
        </motion.p>
        
        <Link to={createPageUrl("Reading")}>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            <Sparkles className="w-5 h-5 mr-2" />
            New Reading
          </Button>
        </Link>
      </div>

      {readings.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-purple-900/20 rounded-full flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No readings yet</h3>
          <p className="text-gray-400 mb-6">Your journey with the cards begins with your first reading</p>
          <Link to={createPageUrl("Reading")}>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Your First Reading
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Readings List */}
          <div className="space-y-6">
            {readings.map((reading, index) => {
              const MoodIcon = moodIcons[reading.mood] || BookOpen;
              
              return (
                <motion.div
                  key={reading.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className={`bg-black/20 mystical-border backdrop-blur-sm cursor-pointer transition-all duration-300 hover:bg-black/30 ${
                      selectedReading?.id === reading.id ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => setSelectedReading(reading)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                            <MoodIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg">
                              {spreadNames[reading.spread_type]}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-400 text-sm">
                                {format(new Date(reading.created_date), "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-purple-200 border-purple-400">
                          {reading.mood}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {reading.question}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs text-gray-400">
                          {reading.cards?.length || 0} cards
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-400">
                          Click to view
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Reading Details */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            {selectedReading ? (
              <Card className="bg-black/20 mystical-border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-yellow-400" />
                    Reading Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-purple-200 text-sm mb-2">Question:</p>
                      <p className="text-white font-medium">{selectedReading.question}</p>
                    </div>

                    <div>
                      <p className="text-purple-200 text-sm mb-3">Cards Drawn:</p>
                      <div className="space-y-2">
                        {selectedReading.cards?.map((card, index) => (
                          <div key={index} className="bg-purple-900/20 p-3 rounded-lg border border-purple-700/30">
                            <div className="flex justify-between items-start mb-1">
                              <p className="text-white font-medium text-sm">{card.name}</p>
                              <Badge variant="outline" className="text-xs text-purple-200 border-purple-400">
                                {card.position}
                              </Badge>
                            </div>
                            <p className="text-gray-300 text-xs">{card.meaning}</p>
                            {card.reversed && (
                              <Badge variant="outline" className="text-xs border-yellow-400 text-yellow-300 mt-1">
                                Reversed
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedReading.interpretation && (
                      <div>
                        <p className="text-purple-200 text-sm mb-2">Interpretation:</p>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          {selectedReading.interpretation}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-black/20 mystical-border backdrop-blur-sm">
                <CardContent className="py-12 text-center">
                  <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-purple-200">
                    Select a reading to view its details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}