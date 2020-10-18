import React from 'react';
import '../styles/globals.css';
import '../styles/reset.css';

/**
 * @param {*} param0 params
 * @return {*} MyApp Component
 */
function MyApp({Component, pageProps}) {
  return <Component {...pageProps} />;
}

export default MyApp;
