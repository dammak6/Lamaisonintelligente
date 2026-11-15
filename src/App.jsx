// App.jsx
// Application principale de présentation "LA MAISON INTELLIGENTE"

import React, { useState } from 'react';
import PresentationFrame from './components/PresentationFrame';
import Scene1Opening from './scenes/Scene1Opening';
import Scene2Definition from './scenes/Scene2Definition';
import Scene3Devices from './scenes/Scene3Devices';
import Scene4Communication from './scenes/Scene4Communication';
import Scene5Advantages from './scenes/Scene5Advantages';
import Scene6Disadvantages from './scenes/Scene6Disadvantages';
import Scene7Conclusion from './scenes/Scene7Conclusion';
import { SCENES } from './data/presentationData';

export default function App() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const handleSceneChange = (newSceneIndex, newStageIndex = 0) => {
    setCurrentSceneIndex(newSceneIndex);
    setCurrentStageIndex(newStageIndex);
  };

  const handleStageChange = (newStageIndex) => {
    setCurrentStageIndex(newStageIndex);
  };

  const renderCurrentScene = () => {
    switch (currentSceneIndex) {
      case 0:
        return <Scene1Opening stageIndex={currentStageIndex} />;
      case 1:
        return <Scene2Definition stageIndex={currentStageIndex} />;
      case 2:
        return <Scene3Devices stageIndex={currentStageIndex} />;
      case 3:
        return <Scene4Communication stageIndex={currentStageIndex} />;
      case 4:
        return <Scene5Advantages stageIndex={currentStageIndex} />;
      case 5:
        return <Scene6Disadvantages stageIndex={currentStageIndex} />;
      case 6:
        return <Scene7Conclusion stageIndex={currentStageIndex} />;
      default:
        return <Scene1Opening stageIndex={currentStageIndex} />;
    }
  };

  return (
    <PresentationFrame
      currentSceneIndex={currentSceneIndex}
      currentStageIndex={currentStageIndex}
      onSceneChange={handleSceneChange}
      onStageChange={handleStageChange}
    >
      {renderCurrentScene()}
    </PresentationFrame>
  );
}
