import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/icons/icon-192x192.png" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                      console.log('Service Worker registered with scope:', registration.scope);
                    })
                    .catch(error => {
                      console.log('Service Worker registration failed:', error);
                    });
                });
              }
            `,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
