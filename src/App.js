import React, { useState } from "react";

import './index.css';

function App() {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [promptText, setpromptText] = useState("Type out this string.");
  const [isInputMatch, setIsInputMatch] = useState(false);
  const [isInputEnabled, setIsInputEnabled] = useState(true);
  const [lastCharMatch, setLastCharMatch] = useState(true);

  let oldInputValue;
  // const lastCharMatch = text[text.length - 1] === promptText[text.length - 1];

  const statusSquare = lastCharMatch ? (
    <div style={{ backgroundColor: "green", width: 50, height: 50 }}></div>
  ) : (
    <div style={{ backgroundColor: "red", width: 50, height: 50 }}></div>
  ); 
  // function ColoredText({ text, letter, color }) {
  //   const textArray = text.split("");
  //   return (
  //     <>
  //       {textArray.map((char, index) => {
  //         if (lastCharMatch == false) {
  //           return (
  //             <span key={index} style={{ color: color }}>
  //               {char}
  //             </span>
  //           );
  //         } else {
  //           return <span key={index}>{char}</span>;
  //         }
  //       })}
  //     </>
  //   );
  // }
  
  const handleInputChange = (e) => {
    rawInput(e);
    checkLastChar(e); //check if new char matches prompt char
    charInput(e); //if input is enabled, change text
    
    // checkFinalValue(e); // see if input matches prompt
  };

  const rawInput = (e) => {
    oldInputValue = userInput; //old user input before it changes to new one that is inputted
    const inputValue = e.target.value;
    
    setUserInput(inputValue);
  }

  const checkLastChar = (e) => {
    let currentStatus = userInput[userInput.length - 1] === promptText[userInput.length - 1];
    
    // if (userInput != "") {
    //   //for some reason text's state is not being updated on the first char input and is ""
    // }
    if (lastCharMatch == true) { //if last char matches, input is enabled
      setIsInputEnabled(true); // enable input when lastCharMatch is true
    }
    else if (lastCharMatch == false) {
      setUserInput(oldInputValue);
      setIsInputEnabled(false); //revert the invald char
    }

    setLastCharMatch(currentStatus);
  }
  const charInput = (e) => {
    const inputValue = e.target.value;

    if (isInputEnabled) {
      setText(inputValue);
    }
  }
  // const checkFinalValue = (e) => {
  //   const inputValue = e.target.value;
  //   setIsInputMatch(inputValue === promptText);
  // };


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
          onKeyDown={(e) => {
            //if input is disabled, allow delete still
            if (!isInputEnabled && (e.keyCode === 8 || e.keyCode === 46)) {
              setText(text.slice(0, -1));
            }
          }}
        />
        <ColoredText text={text} letter= {lastCharMatch} color="red" />
        {statusSquare}
      </div>
      <div>
        <p>text: "{text}"</p>
        <p>last char: {lastCharMatch.toString()} </p>
        {isInputMatch ? <p>Input matches prompt!</p> : <p>Input does not match prompt.</p>}

      </div>
    </div>
  );
}

export default App;