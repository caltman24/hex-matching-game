import "./App.css";
import React, { MouseEventHandler, useState } from "react";

const randomColor = () => {
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hex}`;
};

const shuffleArray = (arr: any[]) => {
  return arr.sort(() => Math.random() - 0.5);
};

function App() {
  const [hexColor, setHexColor] = useState(randomColor);

  const [shuffledOptions, setShuffledOptions] = useState(
    shuffleArray([hexColor, randomColor(), randomColor()])
  );

  const [isIncorrect, setIsIncorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const handleAnswer = (e: any) => {
    const answer = e.target.textContent;
    if (answer === hexColor) {
      if (isIncorrect) setIsIncorrect(false);
      const newColor = randomColor();
      setCorrectCount((count) => count + 1);
      setHexColor(newColor);
      setShuffledOptions(
        shuffleArray([newColor, randomColor(), randomColor()])
      );
    } else {
      setIsIncorrect(true);
    }
  };
  return (
    <div className="App">
      <h1>Hex Matching game</h1>
      <div className="container">
        <h3>Correct: {correctCount}</h3>
        <div
          className="hex-display"
          style={{ backgroundColor: hexColor }}
        ></div>
        <div className="hex-options">
          {shuffledOptions.map((option, i) => (
            <button key={i} className="btn hex-option" onClick={handleAnswer}>
              {option}
            </button>
          ))}
        </div>
      </div>
      {isIncorrect && <h3 className="incorrect">Incorrect! Try again</h3>}
    </div>
  );
}

export default App;
