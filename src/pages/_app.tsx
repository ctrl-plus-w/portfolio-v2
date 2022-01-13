import '../styles/globals.css';

import type { AppProps } from 'next/app';

import Cursor from '@element/Cursor';

import useMediaQuery from '@hook/useMediaQuery';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {useMediaQuery('xl') && <Cursor />}
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
