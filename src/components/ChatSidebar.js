import React, { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ChatRoom from "./ChatRoom";
import RingedAvatar from "./RingedAvatar";
import AddRoom from "./AddRoom";
import { useDispatch } from "react-redux";
import { fetchRooms, signOut } from "../redux/actions";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import {useNavigate} from 'react-router-dom';

function ChatSidebar() {
  const dispatch = useDispatch();
  const messageContainer = useRef(null);
  const Navigate = useNavigate();
  const user = useSelector((state) => state.userAuth.user);
  const Rooms = useSelector((state) => state.roomsCRUD);
  // GET ROOMS
  useEffect(() => {
    dispatch(fetchRooms());
  }, [user]); 
  // SIGN OUT USER
  const signOut_user = () => {
    dispatch(signOut());
    Navigate('/');
  };
  // APPLY STYLING WHEN CLICK ON ROOM
  const remStyle = () => {
    messageContainer.current.childNodes.forEach((element) => {
      element && element.classList.remove("coverdBg");
    });
  };
  const handleOnClick = (e,id) => {
    remStyle();
    let tagName = e.target.localName;
    if(tagName !== 'button' && tagName !== 'svg' && tagName !== 'path'){
      e.target.classList.add("coverdBg"); 
      Navigate(id.toString());
      // OPEN CHAT SECTION IN RESPONIVE VIEW
      if (window.innerWidth <= 767) {
        const chatSection = document.querySelector(".chat");
        if (chatSection && chatSection.className.includes("closeChat")) {
          chatSection.classList.remove("closeChat");
          chatSection.classList.add("openChat");
        }
      }
    }
  };

  return (
    <div className="chat__sidebar">
      <div className="top">
        <div className="left">
          <RingedAvatar src={user && user.photoURL} />
          <h2>{user.displayName}</h2>
        </div>
        <div className="right">
          <IconButton onClick={signOut_user}>
            <LogoutIcon />
          </IconButton>
        </div>
      </div>
      <div className="middle" ref={messageContainer}>
        <AddRoom />
        {Rooms.length > 0 &&
          Rooms.map((Room) => (
            <ChatRoom
              handleOnClick={handleOnClick}
              name={Room.room}
              key={Room.id}
              roomId={Room.id}
            />
          ))}
      </div>
    </div>
  );
}

export default ChatSidebar;
