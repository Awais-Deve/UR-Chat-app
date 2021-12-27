import React from "react";
import RingedAvatar from "./RingedAvatar";
import LoopIcon from "@mui/icons-material/Loop";

function Message(props) {
  const MessgeText = ({ message, time }) => {
    if (time && time.seconds) {
      var dateTime = new Date(time.seconds * 1000),
        timestamp = `${dateTime.toLocaleTimeString()} , ${dateTime.toLocaleDateString()}`;
    }
    return (
      <div className="text">
        <p>{message}</p>
        <p>{timestamp ? timestamp : <LoopIcon />} </p>
      </div>
    );
  };
  return (
    <div
      className={
        props.sender
          ? "message__container message__sender"
          : "message__container"
      }
    >
      <p className="user__name">{props.name}</p>
      <div className="inner">
        <RingedAvatar src={props.photoURL} />
        <div className="messages">
          <MessgeText message={props.message} time={props.time} />
        </div>
      </div>
    </div>
  );
}

export default Message;
