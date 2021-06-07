import styled from "styled-components";

export const GradientBg = styled.div`
  background: radial-gradient(
      50% 65.18% at 50% 50%,
      ${(p) => p.theme.colors.background} 47.73%,
      rgba(255, 255, 255, 0) 100%
    ),
    #eaeaea;

  min-height: 100vh;
`;
export const GithubLink = styled.a`
  font-weight: 500;

  text-decoration: none;

  :hover {
    color: ${(p) => p.theme.colors.primaryShade};
  }
  color: ${(p) => p.theme.colors.primary};
`;
export const ContentContainer = styled.main`
  text-align: center;

  margin-top: 18.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media only screen and (max-width: 590px) {
    margin-top: 6.5rem;
  }
`;

export const MainSlogan = styled.h2`
  font-weight: 700;
  font-size: 6rem;
  line-height: 114%;

  color: ${(p) => p.theme.colors.darkText};

  max-width: 90rem;

  @media only screen and (max-width: 90rem) {
    max-width: 96vw;
  }
`;

export const SideText = styled.p`
  font-size: 2.8rem;
  line-height: 115%;
  margin-top: 3.6rem;

  color: ${(p) => p.theme.colors.lightText};

  max-width: 95%;

  @media only screen and (max-width: 850px) {
    br {
      display: none;
    }
  }
`;

export const BtnsContainer = styled.div`
  margin-top: 8.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

export const StartedBtn = styled.button`
  padding: 2rem 6.5rem;
  border: none;

  background: ${(p) => p.theme.colors.primary};
  border-radius: 8px;

  color: #fff;

  font-weight: bold;
  font-size: 2.5rem;

  cursor: pointer;

  transition: background-color 0.2s ease-in-out;

  :hover {
    background-color: ${(p) => p.theme.colors.primaryShade};
  }

  @media only screen and (max-width: 700px) {
    width: 100%;
    font-size: 19px;
    padding: 2.5rem 8rem;
  }
`;
