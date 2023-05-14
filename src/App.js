import React, { useState, useEffect } from "react";
import './index.css';

function App() {
  const [text, setText] = useState("");
  const [promptText, setPromptText] = useState("type out this string");
  const [isInputMatch, setIsInputMatch] = useState(false);
  const [isInputEnabled, setIsInputEnabled] = useState(true);
  const [lastCharMatch, setLastCharMatch] = useState(true);
  const [wrongChars, setWrongChars] = useState({})

  let prevUserInput;

  const statusSquare = lastCharMatch ? (
    <div style={{ backgroundColor: "green", width: 50, height: 50 }}></div>
  ) : (
    <div style={{ backgroundColor: "red", width: 50, height: 50 }}></div>
  ); 

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    checkLastChar(inputValue);
    charInput(inputValue);    
    if (inputValue == promptText) {
      setIsInputMatch(true);
    }
  };

  const checkLastChar = (inputValue) => {
    if (isInputEnabled == true) {
      const currentStatus = inputValue[inputValue.length - 1] === promptText[inputValue.length - 1];
      setLastCharMatch(currentStatus);
      setIsInputEnabled(currentStatus);

      if (!currentStatus) {
        setWrongChars({ ...wrongChars, [text.length]: false });
      }
    }
  }

  const charInput = (inputValue) => {
    // if (isInputEnabled) {
    //   setText(inputValue);
    // }
    setText(inputValue);
  }

  return (
    <div style={{}}>
      <div id="wrapperHeader">
        <div class="" id="header">
          <h1>
            TypeScripts
          </h1>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div className="containerDiv">
          <div className="inputDiv">
            <div className="inputField"></div>
              <input className="inputElement"
                type="text"
                wrap="soft"
                value={text}
                onChange={handleInputChange}
                onKeyUp={(e) => {
                if ((e.keyCode === 8 || e.keyCode === 46)) {
                    let editedText = text.slice(0, -1);
                    setText(editedText);
                    // setLastCharMatch(true);
                  }
                }}
              />
            </div>
          </div>
        </div>
      <div className="debugInfo">
        <div className="promptText">
            {promptText.split('').map((char, index) => (
              <p key={index} className={index === text.length - 1 && !lastCharMatch ? 'hidden' : 'correct'}>
                {char === ' ' ? '\u00A0' : char} 
              </p> /*allows for spaces */
            ))}
        </div>
        <div className= "inputText">
          {text.split('').map((char, index) => (
            <p key={index} className={index === text.length - 1 && !lastCharMatch ? 'wrong' : 'correct'}>
              {char === ' ' ? '\u00A0' : char} 
            </p> /*allows for spaces */
          ))}
        </div>
        {statusSquare}
        <p>text: "{text}"</p>
        <p>inputEnabled: "{isInputEnabled.toString()}"</p>
        <p>last char: {lastCharMatch.toString()}</p>
        {isInputMatch ? <p>Input matches prompt!</p> : <p>Input does not match prompt.</p>}
        <h3>Wrong Characters:</h3>
        <ul>
          {Object.entries(wrongChars).map(([index, value]) => (
          <p key={index}>{index}: {value.toString()}</p>
          ))}
        </ul>
        {/* <p id="color-change">Move your cursor over this text to change its color.</p> */}
      </div>
    </div>
  );
}

export default App;
