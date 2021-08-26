import React, { useRef } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { db } from "../../../firebase/firebase";
import firebase from "firebase";

function ChatInput({ channelId, channelName }) {
  const inputRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: inputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: "A.K. Afiq",
      userImage:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F7b%2F9a%2F7e%2F7b9a7ec220a26e8ffffcb15e71f16c16.jpg&f=1&nofb=1",
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
