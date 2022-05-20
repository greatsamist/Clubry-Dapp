import "../styles/globals.scss";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider, connector) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
