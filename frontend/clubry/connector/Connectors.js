import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

const CoinbaseWallet = new WalletLinkConnector({
  url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
  appName: "Clubry",
  supportedChainIds: [1, 3, 4, 5, 42],
});

const WalletConnect = new WalletConnectConnector({
  rpcUrl: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});
function Connectors() {
  return <div>Connectors</div>;
}

export default Connectors;
