import React, { useState, useEffect, useRef } from "react";
import './index.css';

function App() {
  const [text, setText] = useState("");
  const [promptText, setPromptText] = useState("type out this string");
  const [isInputMatch, setIsInputMatch] = useState(false);
  const [wrongChars, setWrongChars] = useState({})
  const inputRef = useRef(null); // Create a ref for the input element

  const promptButtonClick = () => {
    setPromptText("test\nnewline\n\ttabbed newline");
  };

  const reloadPage = () => {
    window.location.reload(); // Reload the page
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setText(text + "\t");
    }
  };
  
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setText(inputValue);

    // Remove key-value pair from wrongChars if corresponding character is deleted
    if (inputValue.length < text.length) {
      const deletedIndex = inputValue.length;
      const { [deletedIndex]: deletedChar, ...rest } = wrongChars;
      setWrongChars(rest);
    }

    if (inputValue === promptText) {
      setIsInputMatch(true);
    }
  };
  
  const findWrongChars = () => {
    const charArray = text.split("");
    const newWrongChars = {};

    charArray.forEach((char, index) => {
      // console.log(`Character at index ${index} is ${char}`);
      if (char !== promptText[index]) {
        setWrongChars({ ...wrongChars, [index]: false });
      }
      else {
        setWrongChars({ ...wrongChars, [index]: true });
      }
    });
  }
  
  // Runs findWrongChars() every time input text is updated
  useEffect(() => {
    findWrongChars();
  }, [text]);

  useEffect(() => {
    inputRef.current.focus(); // Focus on the input element when the page loads
  }, []);

  return (
    <div>
      <div id="wrapperHeader">
        <div id="header">
          <h1 className="text-3xl font-bold">TypeScripts</h1>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div className="containerDiv">
          <div className="inputDiv">
            <div className="inputField">
              <input
                className="inputElement"
                ref={inputRef}
                type="text"
                wrap="soft"
                value={text}
                onChange={handleInputChange}
                disabled={isInputMatch}
                spellCheck="false"
                onKeyDown={handleKeyDown}
              />
            </div>
            <p className="promptText">
              {/* turns promptText into an array of chars */}
              {/* .map() iterates through every char in the array */}
              {promptText.split("").map((char, index) => {
                if (char === "\n") {
                  // converts escape character to newline
                  return <br key={index} />;
                }
                if (char === "\t") {
                  return <span key={index}>&emsp;</span>;
                }
                return (
                  <span
                    key={index}
                    id={index}
                    className={
                      wrongChars[index] === undefined
                        ? null // if there is no index in wrongChars for this index, ID is null
                        : wrongChars[index] // if the value for the index is true, set to correct and vice versa
                        ? "correct"
                        : "incorrect"
                    }
                  >
                    {char}
                  </span>
                );
              })}
            </p>
            {/* <div className="w-1 h-8 bg-black" id= "pointer"></div> */}
          </div>
          <p>prompt: "{promptText}"</p>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            id="changePrompt"
            onClick={promptButtonClick}>
            Change Prompt
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded ml-2"
            onClick={reloadPage}
          >Reload Page</button>
        </div>
        <div className="debugInfo">
          <p>text: "{text}"</p>
          {isInputMatch ? (
            <p>Input matches prompt!</p>
          ) : (
            <p>Input does not match prompt.</p>
          )}
          <h3>Wrong Characters:</h3>
          <ul>
            {Object.keys(wrongChars).map((index) => (
              <li key={index}>
                Index {index} is {wrongChars[index] ? "correct" : "wrong"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
