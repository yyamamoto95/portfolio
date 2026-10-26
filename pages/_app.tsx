import Head from 'next/head';
import '../styles/globals.scss';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps): React.JSX.Element => {
    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta
                    name='viewport'
                    content='initial-scale=1.0, width=device-width'
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
