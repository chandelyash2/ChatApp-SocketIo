import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");
function App() {
  const [name, setName] = useState("");
  const [roomId, setroomId] = useState("");
  const [showChat, setShowChat] = useState(false);
 
  console.log(name);
  const joinRoom = (e) => {
    if (name !== "" && roomId !== "") {
      socket.emit("join_room", roomId);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div
          style={{
            position: "absolute",
            boxShadow: "rgb(17 121 87 / 83%) 0px 3px 8px",
            width: "50%",
            top: "35%",
          }}
        >
          <h3>Join A Chat</h3>
          <div className="main_content">
            <input
              className="input"
              placeholder="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input"
              placeholder="room_ID"
              type="text"
              onChange={(e) => setroomId(e.target.value)}
            />
            <button className="btn" type="submit" onClick={joinRoom}>
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <Chat name={name} roomId={roomId} socket={socket} />
      )}
    </div>
  );
}

export default App;
