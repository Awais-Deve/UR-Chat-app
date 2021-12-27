import { auth, db } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  getDoc,
} from "firebase/firestore";

// TYPES
export const Actions_Types = {
  SIGN_IN: "SIGN_IN",
  SING_OUT: "SIGN_OUT",
  FETCH_ROOMS: "FETCH_ROOMS",
  DELETE_ROOM: "DELETE_ROOM",
  CREATE_ROOM: "CREATE_ROOM",
  FETCH_MESSAGES: "FETCH_MESSAGES",
  ADD_MESSAGE: "ADD_MESSAGE",
  DELETE_MESSAGES: "DELETE_MESSAGES",
};

// ACTIONS
export const signIn = () => {
  return async (dispatch) => {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider).catch((err) =>
      alert(err.message)
    );
    dispatch({ type: Actions_Types.SIGN_IN, payload: response.user });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    const response = await auth.signOut().catch((err) => alert(err.message));
    dispatch({ type: Actions_Types.SING_OUT, payload: response });
  };
};

export const fetchRooms = () => {
  return async (dispatch) => {
    const roomRef = collection(db, "chatRoom");
    await onSnapshot(query(roomRef, orderBy("timestamp", "desc")), (data) => {
      dispatch({
        type: Actions_Types.FETCH_ROOMS,
        payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      });
    });
  };
};

export const deleteRoom = (id) => {
  return async (dispatch) => {
    await deleteDoc(doc(db, "chatRoom", id));
    dispatch({ type: Actions_Types.DELETE_ROOM });
  };
};

export const createRoom = (roomName) => {
  return async (dispatch) => {
    await addDoc(collection(db, "chatRoom"), {
      room: roomName,
      timestamp: serverTimestamp(),
    });
    dispatch({ type: Actions_Types.CREATE_ROOM });
  };
};

export const fetchMsgs = (id) => {
  return async (dispatch) => {
    await onSnapshot(
      query(
        collection(db, "chatRoom", id, "messages"),
        orderBy("timestamp", "asc")
      ),
      (data) => {
        
        dispatch({
          type: Actions_Types.FETCH_MESSAGES,
          payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        });
      }
    );
  };
};

export const addMsg = (id, msgData) => {
  return async (dispatch) => {
    await addDoc(collection(db, "chatRoom", id, "messages"), msgData);
    dispatch({ type: Actions_Types.ADD_MESSAGE });
  };
};

export const deleteMsgs = (id) => {
  return async (dispatch) => {
    const collectionRef = collection(db, "chatRoom",id,"messages");
    // const docRef = getDoc(collectionRef);
    dispatch({ type: Actions_Types.DELETE_MESSAGES });
  };
};
