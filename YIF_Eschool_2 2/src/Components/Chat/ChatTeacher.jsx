import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import io from "socket.io-client";

function ChatTeacher() {
  const [{ userDetails }] = useDataLayerValue();
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [roomToShow, setRoomToShow] = useState("");
  const [roomOps, setRoomOps] = useState([]);
  const [userName, setUserName] = useState(userDetails?.name);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("second");
  const socketRef = useRef();

  useEffect(() => {
    setMessage("");
  }, [messages]);
  useEffect(() => {
    if (userDetails.classes) {
      const classes = userDetails.classes;
      setRoomOps(classes);
    }
  }, [userDetails]);

  const roomSelectFunc = (val) => {
    const classDetails =
      userDetails?.classes[userDetails?.classes?.length - 1].split(" ");
    const className = classDetails[0];
    const classSec = classDetails[1];
    setRoom(`${userDetails.schoolId}_${className}_${classSec}`);
    setRoomToShow(`${userDetails.schoolName} (${className}${classSec})`);
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("chat", (data) => {
        setMessages(data);
      });
    }
  });

  const initMessage = (incomingMessages) => {
    // console.log(incomingMessages);
    setMessages(incomingMessages);
  };

  const establishConnection = (e) => {
    e.preventDefault();
    socketRef.current = io.connect("http://localhost:8000");
    // console.log(socketRef.current);
    if (socketRef.current && room) {
      socketRef.current.emit("join", room, (incomingMessages) =>
        initMessage(incomingMessages)
      );
      setConnected(true);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (socketRef.current && message !== "" && room) {
      const messageData = {
        sender: userName,
        message: message,
        room: room,
        isTeacher: true,
      };
      socketRef.current.emit("chat", messageData);
      setMessages([...messages, messageData]);
    }
  };

  return (
    <div className="ChatMain">
      {!connected ? (
        <form
          className="logIn"
          onSubmit={(e) => {
            establishConnection(e);
          }}
        >
          <div className="inputs">
            <input
              type="text"
              //   placeholder="Name..."
              value={userName}
              disabled
            />

            <select
              name=""
              id=""
              onChange={(e) => {
                roomSelectFunc(e.target.value);
              }}
            >
              <option value="">Select Room</option>
              {roomOps.map((roomOp) => (
                <option value={roomOp}>{roomOp}</option>
              ))}
            </select>
          </div>
          <button type="submit">Enter Chat</button>
        </form>
      ) : (
        <div className="chatContainer">
          <div className="chat-room-info">Room : {roomToShow}</div>

          <div className="messages">
            {messages?.map((val, key) => {
              return (
                <div
                  className="messageContainer"
                  id={val.sender == userName ? "You" : "Other"}
                >
                  <div className="messageIndividual">
                    {val.sender === userName ? "You" : val.sender}:{" "}
                    {val.message}
                  </div>
                </div>
              );
            })}
          </div>

          <form
            className="messageInputs"
            onSubmit={(e) => {
              sendMessage(e);
            }}
          >
            <input
              type="text"
              placeholder="Message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatTeacher;
