import Document, { Head, Main, NextScript } from 'next/document'
import Helmet from 'react-helmet'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        const { html, head, errorHtml, chunks } = renderPage()
        const styles = flush()
        return { html, head, errorHtml, chunks, styles, helmet: Helmet.renderStatic() }
    }

    // should render on <html>
    get helmetHtmlAttrComponents() {
        return this.props.helmet.htmlAttributes.toComponent()
    }

    // should render on <body>
    get helmetBodyAttrComponents() {
        return this.props.helmet.bodyAttributes.toComponent()
    }

    // should render on <head>
    get helmetHeadComponents() {
        return Object.keys(this.props.helmet)
            .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
            .map(el => this.props.helmet[el].toComponent())
    }

    get helmetJsx() {
        return (<Helmet
            htmlAttributes={{ lang: 'en' }}
            title='Lucidasian'
            meta={[
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { property: 'og:title', content: 'Lucidasian' }
            ]}
        />)
    }

    render() {
        return (
            <html {...this.helmetHtmlAttrComponents}>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {this.helmetJsx}
                    {this.helmetHeadComponents}
                    <link rel="stylesheet" href="/static/uikit/uikit.min.css" />
                    <script src="/static/uikit/uikit.min.js"></script>
                    <script src="/static/uikit/uikit-icons.min.js"></script>
                    {/* <link rel="stylesheet" href="/_next/static/style.css" /> */}
                </Head>
                <body {...this.helmetBodyAttrComponents}>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}