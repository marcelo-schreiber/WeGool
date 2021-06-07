import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *, input, textarea {
    font-family: 'Poppins', 'Roboto', --apple-system, sans-serif;
  }

  ::selection {
    background-color: ${(p) => p.theme.colors.primaryShade};
    color: #fff;
  }

  body {
    background-color: ${(p) => p.theme.colors.background};
    font-family: 'Poppins', 'Roboto', --apple-system, sans-serif;
    color: ${(p) => p.theme.colors.darkText};
  }

  :root {
    font-size: 62.5%;
  }

  @media only screen and (max-width: 1600px) {
    :root {
      font-size: 40.6%;
    }
  }
`;
