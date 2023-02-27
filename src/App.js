import React, { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [jnl, setJnl] = useState("")
  const [chats, setChats] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://e253-154-113-158-227.eu.ngrok.io", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, jnl }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
        const chat = { message: message, response: data.message };
        setChats([...chats, chat]);
        setMessage(""); // clear input field
      });
      console.log(response)

  };
  return (
    <div>
      <h1>Dr.SAAM Prototype Test 1</h1>
      <p>Just type into the box to start a conversation</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          placeholder="type"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <textarea
          value={jnl}
          placeholder="Journal"
          onChange={(e) => setJnl(e.target.value)}
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>Conversation</p>
      {chats.map((chat, index) => (
        <div key={index}>
          <p>User: {chat.message}</p>
          <p>SAAM: {chat.response}</p>
        </div>
      ))}
    </div>
  );
}
