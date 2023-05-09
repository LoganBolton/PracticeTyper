import React, { useState } from "react";
import './index.css';

function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [introText, setIntroText] = useState("Type out this string.");
  const [isGreen, setIsGreen] = useState(false);

  const lastCharMatch = text[text.length - 1] === introText[text.length - 1];
  
  const toggleColor = () => {
    setIsGreen(!isGreen);
  };

  const statusSquare = lastCharMatch ? (
    <div style={{ backgroundColor: "green", width: 50, height: 50 }}></div>
  ) : (
    <div style={{ backgroundColor: "red", width: 50, height: 50 }}></div>
  );

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <div className="containerDiv">
          <p className="baseText" >{introText}</p>
          <p className="upperText" >{text}</p>
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setList([text, ...list]);
              setText("");
            }
          }}
        />
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {statusSquare}
      </div>
      <div style={{ flex: 1 }}>
        <p>Current state of const text: {text}</p>
        <p>Current state of const list: {JSON.stringify(list)}</p>
        <p>Current state of const introText:</p>
        <p className="bold-text">This text is bold</p>

      </div>
      <div className={`${isGreen ? 'green' : 'red'}`}>
        <button onClick={toggleColor}>Toggle color</button>
        <p>This is my class</p>
      </div>
    </div>
  );
}

export default App;