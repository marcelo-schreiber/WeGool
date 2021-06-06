import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 3.5rem 5rem;

  width: 100%;

  background-color: #fff;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  @media only screen and (max-width: 565px) {
    flex-direction: column;
    padding: 1.6rem 3rem;
  }
`;
