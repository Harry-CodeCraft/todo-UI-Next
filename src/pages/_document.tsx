import * as React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@mui/styles";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/unbound-method
CustomDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  ctx.renderPage = () => {
    return originalRenderPage({
      enhanceApp: (App) => {
        return (props) => {
          return sheets.collect(<App {...props} />);
        };
      },
    });
  };

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      <React.Fragment key="styles">{sheets.getStyleElement()}</React.Fragment>,
    ],
  };
};
