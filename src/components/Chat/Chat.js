import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput/ChatInput";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { selectRoom } from "../../features/appSlice";
import { db } from "../../firebase/firebase";
import Message from "./Message";

function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoom);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading, roomMessages]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>

            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> <span>Details</span>
              </p>
            </HeaderRight>
          </Header>

          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { user, userImage, message, timestamp } = doc.data();

              return (
                <Message
                  key={doc.id}
                  user={user}
                  userImage={userImage}
                  message={message}
                  timestamp={timestamp}
                />
              );
            })}

            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput
            channelId={roomId}
            channelName={roomDetails?.data().name}
          />
        </>
      )}
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  display: flex;

  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 10px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div``;
