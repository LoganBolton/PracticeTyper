import React, { useState, useEffect } from "react";
import './index.css';

function App() {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [promptText, setPromptText] = useState("typ");
  const [isInputMatch, setIsInputMatch] = useState(false);
  const [isInputEnabled, setIsInputEnabled] = useState(true);
  const [lastCharMatch, setLastCharMatch] = useState(true);

  let prevUserInput;

  const statusSquare = lastCharMatch ? (
    <div style={{ backgroundColor: "green", width: 50, height: 50 }}></div>
  ) : (
    <div style={{ backgroundColor: "red", width: 50, height: 50 }}></div>
  ); 

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const lastIndex = inputValue.length - 1;

    checkLastChar(inputValue);
    charInput(inputValue);    
    if (inputValue == promptText) {
      setIsInputMatch(true);
    }

    if (!lastCharMatch && lastIndex < promptText.length) {
      const updatedPromptText = promptText.slice(0, lastIndex) + `<span style="color: red">${promptText[lastIndex]}</span>` + promptText.slice(lastIndex + 1);
      setPromptText(updatedPromptText);
    } else if (lastCharMatch) {
      setPromptText(promptText.replace('<span style="color: red">', '').replace('</span>', ''));
    }

  };

  const checkLastChar = (inputValue) => {
    if (isInputEnabled == true) {
      const currentStatus = inputValue[inputValue.length - 1] === promptText[inputValue.length - 1];
      setLastCharMatch(currentStatus);
      setIsInputEnabled(currentStatus);
    }
  }

  const charInput = (inputValue) => {
    if (isInputEnabled) {
      setText(inputValue);
    }
  }

  const promptTextArray = promptText.split("");
  const lastCharStyle = lastCharMatch ? {} : { color: "red" };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <div className="containerDiv">
        
        <p className="promptText" dangerouslySetInnerHTML={{ __html: promptText }}></p>
        {/* <p className ="inputText">
          {text}
        </p> */}
        </div>
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          onKeyUp={(e) => {
            if (!isInputEnabled && (e.keyCode === 8 || e.keyCode === 46)) {
              let editedText = text.slice(0, -1);
              setText(editedText);
              setIsInputEnabled(true);
              console.log("test");
            }
          }}
        />
        {statusSquare}
      </div>
      <div>
        <p>text: "{text}"</p>
        <p>inputEnabled: "{isInputEnabled.toString()}"</p>
        <p>last char: {lastCharMatch.toString()}</p>
        {isInputMatch ? <p>Input matches prompt!</p> : <p>Input does not match prompt.</p>}
      </div>
    </div>
  );
}

export default App;
