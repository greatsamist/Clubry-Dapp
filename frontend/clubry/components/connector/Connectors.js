import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CHAIN_DATA_LIST } from "web3modal";

export const DEFAULT_CHAIN_ID = 80001;

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: {
        80001:
          "https://polygon-mumbai.g.alchemy.com/v2/7reUbWVPxaHZ9aNB-U-qoba4DXNF7Hxr",
      },
      network: CHAIN_DATA_LIST[DEFAULT_CHAIN_ID].network,
      chainId: 80001,
      // infuraId: "630e61a016f845e58b198597976a9d12", // Required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Clubry", // Required
      // infuraId: "630e61a016f845e58b198597976a9d12", // Required
      rpc: "https://polygon-mumbai.g.alchemy.com/v2/7reUbWVPxaHZ9aNB-U-qoba4DXNF7Hxr", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 80001, // Optional. It defaults to 1 if not provided
      darkMode: true, // Optional. Use dark theme, defaults to false
    },
  },
};
