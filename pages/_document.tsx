import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentProps } from "next/document"
import * as React from "react"

type Props = Record<string, unknown> & DocumentProps

export default class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        const { locale } = this.props.__NEXT_DATA__
        return (
            <Html lang={locale}>
                <Head>
                    <title>Crown Phoenix Marketing Consultancy (CPMC)</title>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f03a3a" />
                    <meta name="msapplication-TileColor" content="#ffffff" />
                    <meta name="theme-color" content="#ffffff"></meta>
                </Head>

                <body className="desktop-transparent bg-gray-100 antialiased dark:bg-darkgray-50">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
