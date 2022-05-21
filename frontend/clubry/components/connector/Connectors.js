import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "630e61a016f845e58b198597976a9d12", // required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Clubry", // Required
      infuraId: "630e61a016f845e58b198597976a9d12", // Required
      rpc: "", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 4, // Optional. It defaults to 1 if not provided
      darkMode: true, // Optional. Use dark theme, defaults to false
    },
  },
};
