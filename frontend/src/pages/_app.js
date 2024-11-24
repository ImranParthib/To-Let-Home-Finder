import { useEffect } from "react";
import "../app/globals.css"; // Updated path to the global CSS file

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-worker.js").then(
          function (registration) {
            console.log("Service Worker registration successful");
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
