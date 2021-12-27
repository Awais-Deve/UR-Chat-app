import React, {  useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {  IconButton } from "@mui/material";
import {useDispatch, useSelector} from 'react-redux';
import { createRoom } from "../redux/actions";

function AddRoom() {
  const [input,setInput] = useState(''),
        inpField = useRef(null),
        dispatch = useDispatch(),
        Rooms = useSelector(state=>state.roomsCRUD);
  
  const showField = () => {
      inpField.current.classList.remove('hide');
      inpField.current.classList.add('show');
  };
  const hideField = ()=>{
    inpField.current.classList.remove('show');
    inpField.current.classList.add('hide');
    let found = false;
    // CREATE A NEW ROOM
    if(Rooms) for (let data of Rooms){
      if(data.room === input){
        found=true;
        break;
      }
    };
    if(found===false){
      dispatch(createRoom(input));
      setInput('');
    }
    else{
      alert('This Room has been already added');
    };
  };
  return (
    <div className="AddRoom" >
     <div className="inner">
     <div className='text' onClick={showField}>
      <AddIcon />
      <h1>Add a new room</h1>
      </div>
      <div className="inp_field hide addRoomField" ref={inpField}>
        <input placeholder="Type a room name..." onChange={(e)=> setInput(e.target.value)} value={input}/>
        <IconButton onClick={hideField} disabled={!input}>
          <AddIcon />
        </IconButton>
      </div>
     </div>
    </div>
  );
}

export default AddRoom;
