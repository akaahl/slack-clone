import React, { useRef } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, db } from "../../../firebase/firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function ChatInput({ channelId, channelName }) {
  const [user] = useAuthState(auth);

  const inputRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: inputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });

    inputRef.current.value = "";
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          type="text"
          ref={inputRef}
          placeholder={`Message #${channelName}`}
        />

        <Button type="submit" hidden onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
