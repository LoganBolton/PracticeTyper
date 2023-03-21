import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [introText, setIntroText] = useState("Type out this string.");

  let statusMessage;
  if (text === introText) {
    statusMessage = <p>Status matches</p>;
  } else {
    statusMessage = <p>You suck</p>;
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <p>{introText}</p>
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
        {statusMessage}
      </div>
      <div style={{ flex: 1 }}>
        <p>Current state of const text: {text}</p>
        <p>Current state of const list: {JSON.stringify(list)}</p>
        <p>Current state of const introText: {introText}</p>
      </div>
    </div>
  );
}

export default App;
