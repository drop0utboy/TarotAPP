import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, BookOpen } from "lucide-react";

import TarotCard from "@/Components/tarot/TarotCard.jsx";

const tarotDeck = [
  // Major Arcana
  { name: "The Fool", suit: "Major Arcana", meaning: "New beginnings, innocence, spontaneity" },
  { name: "The Magician", suit: "Major Arcana", meaning: "Willpower, desire, manifestation" },
  { name: "The High Priestess", suit: "Major Arcana", meaning: "Intuition, sacred knowledge, divine feminine" },
  { name: "The Empress", suit: "Major Arcana", meaning: "Femininity, beauty, nature, abundance" },
  { name: "The Emperor", suit: "Major Arcana", meaning: "Authority, structure, control, fatherhood" },
  { name: "The Hierophant", suit: "Major Arcana", meaning: "Spiritual wisdom, religious beliefs, tradition" },
  { name: "The Lovers", suit: "Major Arcana", meaning: "Love, harmony, relationships, values alignment" },
  { name: "The Chariot", suit: "Major Arcana", meaning: "Control, willpower, success, determination" },
  { name: "Strength", suit: "Major Arcana", meaning: "Strength, courage, patience, control" },
  { name: "The Hermit", suit: "Major Arcana", meaning: "Soul searching, introspection, inner guidance" },
  { name: "Wheel of Fortune", suit: "Major Arcana", meaning: "Good luck, karma, life cycles, destiny" },
  { name: "Justice", suit: "Major Arcana", meaning: "Justice, fairness, truth, karma" },
  { name: "The Hanged Man", suit: "Major Arcana", meaning: "Surrender, letting go, new perspective" },
  { name: "Death", suit: "Major Arcana", meaning: "Endings, transformation, transition" },
  { name: "Temperance", suit: "Major Arcana", meaning: "Balance, moderation, patience, purpose" },
  { name: "The Devil", suit: "Major Arcana", meaning: "Shadow self, attachment, addiction, restriction" },
  { name: "The Tower", suit: "Major Arcana", meaning: "Sudden change, upheaval, chaos, revelation" },
  { name: "The Star", suit: "Major Arcana", meaning: "Hope, faith, purpose, renewal, spirituality" },
  { name: "The Moon", suit: "Major Arcana", meaning: "Illusion, fear, anxiety, subconscious, intuition" },
  { name: "The Sun", suit: "Major Arcana", meaning: "Positivity, fun, warmth, success, vitality" },
  { name: "Judgement", suit: "Major Arcana", meaning: "Judgement, rebirth, inner calling, absolution" },
  { name: "The World", suit: "Major Arcana", meaning: "Completion, integration, accomplishment, travel" },
  // Minor Arcana - Cups
  { name: "Ace of Cups", suit: "Cups", meaning: "Love, new relationships, compassion, creativity" },
  { name: "Two of Cups", suit: "Cups", meaning: "Unified love, partnership, mutual attraction" },
  { name: "Three of Cups", suit: "Cups", meaning: "Friendship, celebration, creativity, community" },
  { name: "Four of Cups", suit: "Cups", meaning: "Meditation, contemplation, apathy, reevaluation" },
  { name: "Five of Cups", suit: "Cups", meaning: "Regret, failure, disappointment, pessimism" },
  { name: "Six of Cups", suit: "Cups", meaning: "Revisiting the past, childhood memories, innocence" },
  { name: "Seven of Cups", suit: "Cups", meaning: "Illusion, choices, wishful thinking, imagination" },
  { name: "Eight of Cups", suit: "Cups", meaning: "Disappointment, abandonment, withdrawal, escapism" },
  { name: "Nine of Cups", suit: "Cups", meaning: "Contentment, satisfaction, gratitude, wish fulfillment" },
  { name: "Ten of Cups", suit: "Cups", meaning: "Divine love, blissful relationships, harmony, alignment" },
  // Minor Arcana - Swords (sample)
  { name: "Ace of Swords", suit: "Swords", meaning: "Breakthrough, clarity, sharp mind, communication" },
  { name: "Two of Swords", suit: "Swords", meaning: "Difficult decisions, weighing options, indecision" },
  { name: "Three of Swords", suit: "Swords", meaning: "Heartbreak, emotional pain, sorrow, grief" },
  { name: "Four of Swords", suit: "Swords", meaning: "Rest, relaxation, meditation, contemplation" },
  { name: "Five of Swords", suit: "Swords", meaning: "Conflict, disagreements, competition, defeat" },
  // Minor Arcana - Wands (sample)
  { name: "Ace of Wands", suit: "Wands", meaning: "Inspiration, new opportunities, growth, potential" },
  { name: "Two of Wands", suit: "Wands", meaning: "Future planning, making decisions, leaving comfort zone" },
  { name: "Three of Wands", suit: "Wands", meaning: "Expansion, foresight, overseas opportunities" },
  { name: "Four of Wands", suit: "Wands", meaning: "Celebration, joy, harmony, relaxation, homecoming" },
  { name: "Five of Wands", suit: "Wands", meaning: "Conflict, competition, disagreement, strife" },
  // Minor Arcana - Pentacles (sample)
  { name: "Ace of Pentacles", suit: "Pentacles", meaning: "New financial opportunity, manifestation, abundance" },
  { name: "Two of Pentacles", suit: "Pentacles", meaning: "Multiple priorities, time management, prioritization" },
  { name: "Three of Pentacles", suit: "Pentacles", meaning: "Collaboration, teamwork, skill, competence" },
  { name: "Four of Pentacles", suit: "Pentacles", meaning: "Possessiveness, insecurity, hoarding, control" },
  { name: "Five of Pentacles", suit: "Pentacles", meaning: "Financial loss, poverty, lack, isolation" }
];

const spreadPositions = {
  single: ["Present"],
  three_card: ["Past", "Present", "Future"],
  celtic_cross: [
    "Present Situation",
    "The Challenge",
    "Distant Past",
    "Possible Outcome",
    "Recent Past",
    "Future Influence",
    "Your Approach",
    "External Influences",
    "Inner Feelings",
    "Final Outcome"
  ]
};

export default function ReadingInterface({ spreadType, onBack, onSaveReading }) {
  const [currentStep, setCurrentStep] = useState("question");
  const [question, setQuestion] = useState("");
  const [mood, setMood] = useState("");
  const [drawnCards, setDrawnCards] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [interpretation, setInterpretation] = useState("");
  const [isGeneratingInterpretation, setIsGeneratingInterpretation] = useState(false);

  const positions = spreadPositions[spreadType];
  const cardCount = positions.length;

  const shuffleAndDrawCards = () => {
    const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
    const drawn = shuffled.slice(0, cardCount).map((card, index) => ({
      ...card,
      position: positions[index],
      reversed: Math.random() > 0.5
    }));
    setDrawnCards(drawn);
    setCurrentStep("drawing");
  };

  const revealCard = (index) => {
    if (!revealedCards.includes(index)) {
      setRevealedCards([...revealedCards, index]);
    }
  };

  const generateInterpretation = async () => {
    setIsGeneratingInterpretation(true);
    try {
      const { InvokeLLM } = await import("@/integrations/Core");
      
      const cardDescriptions = drawnCards.map(card => 
        `${card.name} (${card.suit}) in position "${card.position}"${card.reversed ? ' (reversed)' : ''}: ${card.meaning}`
      ).join('\n');

      const prompt = `You are a wise and insightful tarot reader. Please provide a comprehensive interpretation for this tarot reading:

Question: "${question}"
Mood/Focus: ${mood}
Spread Type: ${spreadType.replace('_', ' ')}

Cards drawn:
${cardDescriptions}

Please provide a thoughtful, inspiring, and insightful interpretation that:
1. Addresses the question asked
2. Explains how the cards relate to each other
3. Considers the positions of the cards in the spread
4. Offers guidance and wisdom
5. Maintains a positive and empowering tone

The interpretation should be detailed but accessible, around 200-300 words.`;

      const result = await InvokeLLM({ prompt });
      setInterpretation(result);
      setCurrentStep("interpretation");
    } catch (error) {
      console.error("Error generating interpretation:", error);
      setInterpretation("The cards whisper of transformation and new beginnings. Trust in your inner wisdom to guide you forward.");
      setCurrentStep("interpretation");
    }
    setIsGeneratingInterpretation(false);
  };

  const saveReading = () => {
    const reading = {
      spread_type: spreadType,
      question,
      mood,
      cards: drawnCards,
      interpretation
    };
    onSaveReading(reading);
  };

  if (currentStep === "question") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 text-purple-200 hover:text-white hover:bg-purple-900/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Spreads
            </Button>
            <h2 className="mystical-title text-3xl font-bold text-white mb-4">
              Prepare Your Reading
            </h2>
            <p className="text-purple-200">
              Focus your intention and ask your question
            </p>
          </div>

          <Card className="bg-black/20 mystical-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Your Question
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-gray-300">What would you like guidance on?</Label>
                <Textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask your question to the universe..."
                  className="bg-black/30 border-purple-700 text-white placeholder-gray-400"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Focus Area</Label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger className="bg-black/30 border-purple-700 text-white">
                    <SelectValue placeholder="Choose your reading focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guidance">General Guidance</SelectItem>
                    <SelectItem value="love">Love & Relationships</SelectItem>
                    <SelectItem value="career">Career & Finance</SelectItem>
                    <SelectItem value="spiritual">Spiritual Growth</SelectItem>
                    <SelectItem value="general">Life Path</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={shuffleAndDrawCards}
                disabled={!question.trim() || !mood}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 py-3"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Draw Cards
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (currentStep === "drawing") {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="mystical-title text-3xl font-bold text-white mb-4">
            Your Cards Await
          </h2>
          <p className="text-purple-200 mb-2">
            Click each card to reveal its message
          </p>
          <Badge variant="outline" className="text-purple-200 border-purple-400">
            {revealedCards.length} of {cardCount} revealed
          </Badge>
        </div>

        <div className={`grid gap-6 justify-center auto-rows-min ${
          spreadType === "single" ? "grid-cols-1" : 
          spreadType === "three_card" ? "grid-cols-1 md:grid-cols-3" :
          "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        }`}>
          {drawnCards.map((card, index) => (
            <div key={index} className="flex-none flex flex-col items-center space-y-4">
              <TarotCard
                card={card}
                isRevealed={revealedCards.includes(index)}
                onReveal={() => revealCard(index)}
                delay={index * 0.1}
              />
              <div className="text-center">
                <p className="text-purple-200 text-sm font-medium">
                  {card.position}
                </p>
                <AnimatePresence>
                  {revealedCards.includes(index) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 space-y-1"
                    >
                      <p className="text-white font-medium text-sm">
                        {card.name}
                      </p>
                      <p className="text-gray-300 text-xs">
                        {card.meaning}
                      </p>
                      {card.reversed && (
                        <Badge variant="outline" className="text-xs border-yellow-400 text-yellow-300">
                          Reversed
                        </Badge>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {revealedCards.length === cardCount && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mt-8"
            >
              <Button
                onClick={generateInterpretation}
                disabled={isGeneratingInterpretation}
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white px-8 py-3 text-lg"
              >
                {isGeneratingInterpretation ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Interpreting...
                  </>
                ) : (
                  <>
                    <BookOpen className="w-5 h-5 mr-2" />
                    Get Interpretation
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (currentStep === "interpretation") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="mystical-title text-3xl font-bold text-white mb-4">
              Your Reading
            </h2>
            <p className="text-purple-200">
              The cards have spoken - here is your guidance
            </p>
          </div>

          <Card className="bg-black/20 mystical-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-yellow-400" />
                Interpretation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-700/30">
                <p className="text-purple-200 text-sm mb-2">Your Question:</p>
                <p className="text-white font-medium">{question}</p>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-200 leading-relaxed text-lg">
                  {interpretation}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={saveReading}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  Save Reading
                </Button>
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="border-purple-400 text-purple-200 hover:bg-purple-900/20"
                >
                  New Reading
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }
}