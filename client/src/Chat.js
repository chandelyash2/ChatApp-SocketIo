import React, { useState, useEffect } from "react";
import "./App.css";
function Chat({ name, roomId, socket }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  console.log(name);
  console.log(roomId);
  const sendMessage = async (e) => {
    if (currentMessage !== "") {
      const messageDtaa = {
        author: name,
        room: roomId,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageDtaa);
    }
  };
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div>
      <h3>Live Chat</h3>
      <div className="chat_body">
        {messageList.map((list) => {
          return (
            <div style={{ display: "flex", margin: "1rem" }}>
              <h4>{list.author}</h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  color: "gray",
                  margin: "12px",
                  boxShadow: "rgb(17 121 87 / 83%) 0px 3px 8px",
                  width: "auto",
                }}
              >
                <p style={{ marginLeft: "18px" }}>{list.message}</p>
                <p style={{ marginLeft: "10px" }}>{list.time}</p>
              </div>
            </div>
          );
        })}
        <div className="chat_content">
          <input
            placeholder="enter a message"
            type="text"
            onChange={(e) => setCurrentMessage(e.target.value)}
            style={{
              width: "300px",
              height: "40px",
              marginTop: "18px",
              textAlign: "center",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              width: "300px",
              height: "40px",
              marginTop: "18px",
              marginBottom: "18px",
              color: "black",
              backgroundColor: "beige",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
