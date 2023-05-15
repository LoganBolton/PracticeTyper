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
    // Add your desired functionality here
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

    if (inputValue == promptText) {
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
    inputRef.current.focus(); // Focus on the input element when the component mounts
  }, []);

  return (
    <div style={{}}>
      <div id="wrapperHeader">
        <div className="" id="header">
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
                ref={inputRef} // Set the ref to the input element
                type="text"
                wrap="soft"
                value={text}
                onChange={handleInputChange}
                disabled = {isInputMatch}
                spellCheck="false"
              />
              <p className="promptText">
                {" "}
                {/* turns promptText into an array of chars */}
                {/* .map() iterates through every char in the array */}
                {/*  */}
                {promptText.split("").map((char, index) => (
                  <span
                    key={index}
                    id={
                      wrongChars[index] === undefined
                      ? null //if there is no index in wrongChars for this index, ID is null
                        : wrongChars[index] //if the value for the index is true, set to correct and vice versa
                        ? "correct"
                        : "incorrect"
                    }
                  >
                    {char}
                  </span>
                ))}
              </p>
            </div>
            <p>prompt: "{promptText}"</p>
          </div>
          <p className="">This is a test</p>
          <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          id="changePrompt"
          onClick={promptButtonClick}>Change Prompt</button>
        </div>
      <div className="debugInfo">
        <p>text: "{text}"</p>
        {isInputMatch ? <p>Input matches prompt!</p> : <p>Input does not match prompt.</p>}
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
  );
}

export default App;
