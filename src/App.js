import React, { useState } from "react";

import './index.css';

function App() {
  const [text, setText] = useState("");
  const [promptText, setpromptText] = useState("Type out this string.");
  const [isInputMatch, setIsInputMatch] = useState(false);
  const [isInputEnabled, setIsInputEnabled] = useState(true);
  const [lastCharMatch, setLastCharMatch] = useState(true);

  // const lastCharMatch = text[text.length - 1] === promptText[text.length - 1];

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
          if (lastCharMatch == false) {
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
  
  const handleInputChange = (e) => {
    checkFinalValue(e);
    checkLastChar(e);
  };

  const checkFinalValue = (e) => {
    const inputValue = e.target.value;
    setText(inputValue);
    setIsInputMatch(inputValue === promptText);
  };

  const checkLastChar = (e) => {
    if (lastCharMatch) { //if last char matches, input is enabled
      setIsInputEnabled(false); // enable input when lastCharMatch is true
    }
    else {
      setIsInputEnabled(true);
    }

    let currentStatus = text[text.length - 1] === promptText[text.length - 1];
    setLastCharMatch(currentStatus);
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
          onChange={handleInputChange}
          disabled={!isInputEnabled} // disable input when lastCharMatch is false
        />
        <ColoredText text={text} letter= {lastCharMatch} color="red" />
        {statusSquare}
      </div>
      <div>
        <p>{lastCharMatch} </p>
        {isInputMatch ? <p>Input matches prompt!</p> : <p>Input does not match prompt.</p>}

      </div>
    </div>
  );
}

export default App;