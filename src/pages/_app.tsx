import '../styles/globals.css';

import type { AppProps } from 'next/app';

import Cursor from '@element/Cursor';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Cursor />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
