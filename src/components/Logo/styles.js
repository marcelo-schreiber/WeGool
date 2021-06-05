import styled from "styled-components";

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

export const Title = styled.h1`
  margin-left: 13px;

  font-weight: 500;
  font-size: 2.813rem;
  font-family: "Montserrat", "Poppins", --apple-system, sans-serif;

  color: ${(p) => p.theme.colors.primary};
`;
