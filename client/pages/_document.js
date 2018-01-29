import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

          {/* uikit css */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.38/css/uikit.min.css" />
          {/* quill core */}
          <link href="//cdn.quilljs.com/1.3.5/quill.core.css" rel="stylesheet" />
          <script src="//cdn.quilljs.com/1.3.5/quill.core.js"></script>
          {/* quill js */}
          <script src="//cdn.quilljs.com/1.3.5/quill.min.js"></script>
          {/* quill theme */}
          <link href="//cdn.quilljs.com/1.3.5/quill.snow.css" rel="stylesheet" />
          <link href="//cdn.quilljs.com/1.3.5/quill.bubble.css" rel="stylesheet" />

          {/* tab icon */}
          <link rel="icon" href="/static/icon/L-icon.png" />
          {/* Title */}
          <title>Lucidasian</title>
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* uikit */}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.38/js/uikit.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.38/js/uikit-icons.min.js"></script>
        </body>
      </html>
    )
  }
}