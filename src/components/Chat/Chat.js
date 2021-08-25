import React from "react";
import styled from "styled-components";

function Chat() {
  return (
    <ChatContainer>
      <h1>Chat room</h1>
    </ChatContainer>
  );
}

export default Chat;

const ChatContainer = styled.div`
  margin-top: 60px;
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
`;
