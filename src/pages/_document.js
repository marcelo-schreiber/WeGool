import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Poppins:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/logo.svg" />
          <link rel="icon" href="/logo.svg" type="image/svg+xml" />
          <link rel="icon" href="/Logo@1x.png" sizes="16x16" type="image/png" />
          <link rel="icon" href="/Logo@2x.png" sizes="32x32" type="image/png" />
          <link rel="icon" href="/favicon.ico" sizes="48x48" type="image/png" />
          <link rel="icon" href="/Logo@4x.png" sizes="64x64" type="image/png" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3D71BF" />

          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="msapplication-TileColor" content="#3D71BF" />
          <meta property="og:title" content="WeGool" />
          <meta
            property="og:description"
            content="Visualização de dados das suas redações"
          />
          <meta name="theme-color" content="#6D41A1" />
          <meta property="og:site_name" content="WeGool" />

          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt-br" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
