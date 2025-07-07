import React, { useState } from "react";
import { TarotReading } from "@/entities/TarotReading";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import SpreadSelector from "../components/tarot/SpreadSelector";
import ReadingInterface from "../components/tarot/ReadingInterface";

export default function Reading() {
  const navigate = useNavigate();
  const [selectedSpread, setSelectedSpread] = useState(null);

  const handleSelectSpread = (spreadType) => {
    setSelectedSpread(spreadType);
  };

  const handleBack = () => {
    setSelectedSpread(null);
  };

  const handleSaveReading = async (reading) => {
    try {
      await TarotReading.create(reading);
      navigate(createPageUrl("History"));
    } catch (error) {
      console.error("Error saving reading:", error);
    }
  };

  return (
    <div className="min-h-screen">
      {!selectedSpread ? (
        <SpreadSelector onSelectSpread={handleSelectSpread} />
      ) : (
        <ReadingInterface
          spreadType={selectedSpread}
          onBack={handleBack}
          onSaveReading={handleSaveReading}
        />
      )}
    </div>
  );
}