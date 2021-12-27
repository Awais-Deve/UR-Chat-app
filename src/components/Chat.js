import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Button, IconButton } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addMsg, deleteMsgs, fetchMsgs } from "../redux/actions";
import { useParams } from "react-router-dom";
import { serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import Loader from "./Loader";
import { db } from "../firebase";

function Chat() {
  const { roomID } = useParams(),
    [input, setInput] = useState(""),
    [tempLoader, setTempLoader] = useState(true),
    forScroll = useRef(null),
    dispatch = useDispatch();
  const msgs = useSelector((state) => state.msgsCRUD), 
    user = useSelector((state) => state.userAuth.user);

  // GET MESSAGES
  useEffect(() => {
    dispatch(fetchMsgs(roomID));
  }, [roomID]);
  // AUTOMATICALLY SCROLL BOTTOM IN CHAT AREA
  useEffect(() => {
    forScroll.current.scrollTop = forScroll.current.scrollHeight;
  }, [roomID, msgs]);
  // SEND MESSAGE
  const sendMsg = () => {
    let msgData = {
      message: input,
      user: user.displayName,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
    };
    dispatch(addMsg(roomID, msgData));
    setInput("");
  };
  // CLEAR MESSAGES
  const clearChat = () => {
    // dispatch(deleteMsgs(roomID));
    if (msgs.length > 0) {
      msgs.forEach((message) => {
        setTempLoader(true);
        tempLoader && console.log("loadinge...");
        deleteDoc(doc(db, "chatRoom", roomID, "messages", message.id))
          .then(() => setTempLoader(false))
          .catch((err) => alert(err.message));
      });
    } else {
      alert("There is no message to delete in this chat Room :)");
    }
  };

  // CLOSE CHAT SECTION IN RESPONSIVE VIEW
  const closeChat = () => {
    const chatSection = document.querySelector(".chat");
    chatSection.classList.remove("openChat");
    chatSection.classList.add("closeChat");
  };

  return (
    <div className="chat closeChat">
      <div className="top">
        <button className="clearChat" onClick={clearChat}>
          Clear Chat
        </button>
        <IconButton onClick={closeChat}>
          <CloseOutlinedIcon />
        </IconButton>
      </div>
      <div className="middle" ref={forScroll}>
        {msgs.length > 0 &&
          msgs.map((data) => (
            <Message
              sender={data.user === user.displayName ? true : false}
              photoURL={data.photoURL}
              name={data.user === user.displayName ? "you" : data.user}
              message={data.message}
              time={data.timestamp}
              key={data.id.toString()}
            />
          ))}
      </div>
      <div className="footer">
        <IconButton className="rotate">
          <AttachFileIcon />
        </IconButton>
        <IconButton>
          <MicNoneIcon />
        </IconButton>
        <input
          placeholder="Type a new message..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <Button
          className="submitBtn"
          disabled={!input}
          endIcon={<SendOutlinedIcon />}
          onClick={sendMsg}
        >
          <p>send</p>
        </Button>
      </div>
    </div>
  );
}

export default Chat;
