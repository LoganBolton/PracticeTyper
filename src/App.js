import React, { useState, useEffect } from "react";
import './index.css';

function App() {
  const [text, setText] = useState("");
  const [promptText, setPromptText] = useState("type out this string");
  const [isInputMatch, setIsInputMatch] = useState(false);
  const [wrongChars, setWrongChars] = useState({})

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
  
  // Runs findWrongChars() every time text is updated
  useEffect(() => {
    findWrongChars();
  }, [text]);

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
                type="text"
                wrap="soft"
                value={text}
                onChange={handleInputChange}
                disabled = {isInputMatch}
              />
            </div>
            <p>prompt: "{promptText}"</p>
            <p>
              prompt:{" "}
              {promptText.split("").map((char, index) => (
                <span
                  key={index}
                  id={
                    wrongChars[index] === undefined
                      ? null
                      : wrongChars[index]
                      ? "correct"
                      : "incorrect"
                  }
                >
                  {char}
                </span>
              ))}
            </p>
          </div>
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

        {/* <p id="color-change">Move your cursor over this text to change its color.</p> */}
      </div>
    </div>
  );
}

export default App;
