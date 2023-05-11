import React, { useState } from "react";

import './index.css';

function App() {
  const [text, setText] = useState("");
  const [promptText, setpromptText] = useState("Type out this string.");
  const [isGreen, setIsGreen] = useState(false);

  const lastCharMatch = text[text.length - 1] === promptText[text.length - 1];
  
  const toggleColor = () => {
    setIsGreen(!isGreen);
  };

  const statusSquare = lastCharMatch ? (
    <div style={{ backgroundColor: "green", width: 50, height: 50 }}></div>
  ) : (
    <div style={{ backgroundColor: "red", width: 50, height: 50 }}></div>
  ); 

  function ColoredText({ text, letter, color }) {
    const textArray = text.split("");
    return (
      <>
        {textArray.map((char, index) => {
          if (char.toLowerCase() === letter.toLowerCase()) {
            return (
              <span key={index} style={{ color: color }}>
                {char}
              </span>
            );
          } else {
            return <span key={index}>{char}</span>;
          }
        })}
      </>
    );
  }
    
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <div className="containerDiv">
          <p >
            {promptText}
          </p>
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <ColoredText text={text} letter="o" color="red" />
        {statusSquare}
      </div>
    </div>
  );
}

export default App;