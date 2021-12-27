import React from "react";
import RingedAvatar from "./RingedAvatar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom } from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ChatRoom(props) {
  const dispatch = useDispatch(),
    Navigate = useNavigate();
  // DELETE ROOM
  const delRoom = () => {
    dispatch(deleteRoom(props.roomId));
    Navigate("/");
  };
  return (
    <div className="room" onClick={(e) => props.handleOnClick(e, props.roomId)}>
      <RingedAvatar />
      <div className="text">
        <h2>{props.name}</h2>
      </div>
      <IconButton sx={{ marginLeft: "auto" }} onClick={delRoom}>
        <DeleteOutlineIcon />
      </IconButton>
    </div>
  );
}

export default ChatRoom;
