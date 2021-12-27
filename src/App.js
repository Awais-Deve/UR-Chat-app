import ChatSidebar from "./components/ChatSidebar";
import Chat from "./components/Chat";
import "./css/font.css";
import "./css/main.css";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import SignIn from "./components/SignIn";
import { useSelector } from "react-redux";
import { useEffect } from "react";


function App() {
  const user = useSelector((state) => state.userAuth.user);
  const Rooms = useSelector(state=>state.roomsCRUD);

  // REMOVE ROOM ID FROM URL WHEN WINDOW RELOADED
  useEffect(()=>{
    window.addEventListener('load',()=>{
      window.history.replaceState('','','/');
    })
  },[])
  return (
    <div className="App">
      {user ? (
        <Router>
          <div className="app__body">
            <ChatSidebar />
            <Routes>
              <Route path="/:roomID" element={<Chat/>} />
              <Route path="/" element={Rooms.length===0 ? <CreateRoomAlert/> : <ClickOnRoomAlert/>}/>
            </Routes>
          </div>
        </Router>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
function CreateRoomAlert(){
  return (
    <div className='Alerts'>
      <h1>create a New room </h1>
    </div>
  )
}

function ClickOnRoomAlert(){
  return (
    <div className='Alerts'>
      <h1>Click on any Room</h1>
    </div>
  )
}


export default App;
