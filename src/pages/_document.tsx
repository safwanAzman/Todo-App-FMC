import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
      </Head>
      <body className="dark:bg-gray-900 bg-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
