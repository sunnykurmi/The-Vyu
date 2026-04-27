import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <link rel="stylesheet" href="" />{" "} */}
        {/* <script
          async
          src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@0.2.28/bundled/lenis.js"
        ></script> */}
        <link
          rel="stylesheet"
          href="https://use.typekit.net/izt7oyh.css"
        ></link>
        <link rel="stylesheet" href="https://unpkg.com/mouse-follower@1/dist/mouse-follower.min.css"/>

        
        {/* <link
          rel="stylesheet"
          href="https://use.typekit.net/smz6nuo.css"
        ></link> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
