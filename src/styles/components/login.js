import styled from "styled-components";

export const Title = styled.h1`
  font-weight: bold;
  font-size: 3.516rem;

  color: ${(p) => p.theme.colors.darkText};

  margin-bottom: 2.5rem;
`;

export const Input = styled.input`
  background: #fdfdfd;
  border: 2px solid ${(p) => p.theme.colors.border};
  border-radius: 8px;

  padding: 15px;
  font-size: 18px;

  width: 150%;

  margin-top: 7px;
  margin-bottom: 5.5rem;

  ::placeholder {
    color: #d6d7d8;
  }

  @media only screen and (max-width: 1255px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  background: ${(p) => p.theme.colors.primary};
  border-radius: 8px;

  text-align: center;

  border: none;
  padding: 12px 0;

  width: 150%;

  color: #ffffff;

  font-size: 22.5px;
  font-weight: bold;

  transition: background-color 0.2s ease-in;

  cursor: pointer;

  :hover {
    background-color: ${(p) => p.theme.colors.primaryShade};
  }

  @media only screen and (max-width: 1255px) {
    width: 100%;
  }
`;

export const Subtitle = styled.p`
  width: 100%;
  max-width: 375px;

  font-size: 18px;
  line-height: 122.5%;

  color: ${(p) => p.theme.colors.lightText};

  @media only screen and (max-width: 372px) {
    font-size: 15px;
  }
`;

export const LogoPlacer = styled.div`
  justify-self: top;
  margin-top: 3.5rem;

  margin-bottom: 10rem;
`;

export const LoadingPlacer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LeftSideWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-left: 5rem;

  @media only screen and (max-width: 450px) {
    width: 95vw;
  }

  > form {
    margin-top: 3.5rem;
    display: flex;
    flex-direction: column;
  }
`;

export const Label = styled.label`
  font-size: 18px;
  color: ${(p) => p.theme.colors.darkText};
`;

export const RightSideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 6.5rem;

  > img {
    max-width: 95%;
  }
`;

export const RightParagraphTitle = styled.h2`
  font-weight: bold;
  font-size: 2.7rem;
  line-height: 2.7rem;

  color: #ffffff;
`;

export const RightParagraphContent = styled.p`
  font-size: 2rem;
  line-height: 2rem;
  text-align: center;

  width: 235px;

  color: #ffffff;

  margin: 11px 0px;
`;

export const RightSideContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
`;

export const GlassBackground = styled.div`
  position: absolute;
  width: 47.52rem;
  height: 47.52rem;
  right: 0;
  top: 0;

  max-width: 100%;

  background-color: rgba(243, 215, 248, 0.1);
`;

export const RightContent = styled.section`
  position: relative;

  height: 100vh;
  width: 80.52rem;
  min-width: 58vw;
  background: linear-gradient(
      151.07deg,
      #5a23b8 0%,
      rgba(98, 48, 159, 0.0242504) 51.57%,
      rgba(98, 49, 158, 0) 103.78%
    ),
    ${(p) => p.theme.colors.primary};
`;

export const Wrapper = styled.main`
  height: 100vh;
  max-width: 100vw;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
