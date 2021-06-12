import styled from "styled-components";

export const GradientBg = styled.div`
  background: radial-gradient(
      62.47% 81.44% at 50% 61.38%,
      #ffffff 36.79%,
      rgba(255, 255, 255, 0) 100%
    ),
    #eaeaea;
  mix-blend-mode: normal;
  min-height: 100vh;

  .recharts-wrapper {
    margin: 0 auto !important;
  }
`;

export const ChartTitle = styled.h2`
  text-align: center;
  margin: 4rem 0;
  font-size: 2.6rem;

  color: ${(p) => p.theme.colors.darkText};
`;

export const List = styled.ul`
  font-size: 2.6rem;
  line-height: 131.5%;
  list-style: none;

  color: #7c8083;
`;

export const Value = styled.b`
  color: #6d41a1;
`;

export const CalculationsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 3.5rem auto;
  width: 93%;
`;

export const QuitButton = styled.button`
  background-color: ${(p) => p.theme.colors.primary};
  border-radius: 8px;

  font-weight: bold;
  font-size: 2.25rem;
  line-height: 115%;
  /* or 26px */

  padding: 1.1rem 3.8rem;

  text-align: center;

  border: none;

  color: #ffffff;

  cursor: pointer;

  :hover {
    background-color: ${(p) => p.theme.colors.primaryShade};
  }
`;
