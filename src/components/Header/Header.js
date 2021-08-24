import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <HeaderContainer>
      <h1>This is a header</h1>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  background-color: black;
`;
