import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";

export const DEFAULT_CHAIN_ID = 80001;

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: {
        80001: "https://matic-mumbai.chainstacklabs.com",
      },
      network: 'polygonMumbai',
            chainId: 80001,
            infuraId: "630e61a016f845e58b198597976a9d12", // Required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Clubry", // Required
      // infuraId: "630e61a016f845e58b198597976a9d12", // Required
      rpc: "https://matic-mumbai.chainstacklabs.com", // Optional if `infuraId` is provided; otherwise it's required
      // chainId: 4, // Optional. It defaults to 1 if not provided
      darkMode: true, // Optional. Use dark theme, defaults to false
    },
  },
};
