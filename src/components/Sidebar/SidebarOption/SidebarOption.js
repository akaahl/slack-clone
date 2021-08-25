import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { enterRoom } from "../../../features/appSlice";
import { db } from "../../../firebase/firebase";

function SidebarOption({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();

  const addChannel = () => {
    const channelName = prompt("Please add channel name");

    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };

  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="large" style={{ padding: 10 }} />}

      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  &:hover {
    background-color: #340e36;
    opacity: 0.9;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SidebarOptionChannel = styled.h3`
  padding: 10px;
  font-weight: 300;
`;
