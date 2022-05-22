import "../styles/globals.scss";

import { Web3Provider } from '../contexts/Web3Context';

function MyApp({ Component, pageProps }) {
  return (
    
  <Web3Provider>
   <Component {...pageProps} />
  </Web3Provider>)
}

export default MyApp;
