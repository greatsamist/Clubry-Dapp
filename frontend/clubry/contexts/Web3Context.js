import { useEffect, createContext, useState, useRef } from 'react';
import Web3Modal, { CHAIN_DATA_LIST } from 'web3modal';
import { ethers } from 'ethers';
import {DEFAULT_CHAIN_ID, providerOptions } from "../components/connector/Connectors";
import { DEFAULT_CHAINS } from "../components/connector/Blockchain";

export const Web3Context = createContext()

export const Web3Provider = (props) => {
	const { children } = props;
	const [provider, setProvider] = useState();
  	// const [library, setLibrary] = useState();
	  /** Wallet connection */
	  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
	  const web3ModalRef = useRef();
	  // walletConnected keep track of whether the user's wallet is connected or not
	  const [wallet, setWallet] = useState();
	  const [modal, setModal] = useState();


////////////////////////////////////////////////////////////////////////////////////
	const onConnect = async (modal) => {
	const instance = await modal?.connect();
	if (!instance) {
		return undefined;
	}

	instance.on('accountsChanged', (accounts) => {
		const prov = new ethers.providers.Web3Provider(instance);
		if (wallet?.address !== accounts[0]) {
			getWeb3Account(prov);
		}
	});

	instance.on('chainChanged', (chainId) => {
		const prov = new ethers.providers.Web3Provider(instance);
		getWeb3Account(prov);
	});

	const prov = new ethers.providers.Web3Provider(instance);
	setProvider(prov);
	getWeb3Account(prov);

	return prov;
	};


////////////////////////////////////////////////////////////////////////////

	const getWeb3Account = async (provider) => {
	if (!provider) {
		throw new Error('provider is not defined');
	}
	const myWallet = {};
	try {
		const signer = provider.getSigner();
		const address = await signer.getAddress();
		myWallet.address = address;
		const ensName = await provider.lookupAddress(address);
		if (ensName) {
			myWallet.ensName = ensName;
			const resolver = await provider.getResolver(ensName);
			const avatarMetaData = await resolver?.getText("avatar");
			myWallet.avatar = avatarMetaData;
		}
	} catch (e) {
		console.error(e);
	}
	setWallet(myWallet);
	return myWallet;
	};

///////////////////////////////////////////////////////////
   /**
     * Disconnect from the provider
     */
    const onDisconnect = async () => {
        if (modal) {
            modal?.clearCachedProvider();
            setWallet(undefined);
        }
    };

/////////////////////////////////////////////////////////

 // when modal is available
 	useEffect(() => {
	if (modal?.cachedProvider) {
		onConnect(modal);
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modal]);

/////////////////////////////////////////////////////////

 // on page load init web3modal
	useEffect(() => {
		const web3Modal = new Web3Modal({
			network: CHAIN_DATA_LIST[DEFAULT_CHAIN_ID].network,
			cacheProvider: true,
			providerOptions,
			theme: {
				background: "rgb(14, 12, 39)",
				main: "rgb(199, 199, 199)",
				secondary: "rgb(136, 136, 136)",
				border: "rgb(145, 126, 255, 0.14)",
				hover: "rgb(145, 126, 255, .3)"
			  },
			
		});
		setModal(web3Modal);
	}, []);

/////////////////////////////////////////////////////////

  /**
     * Calling connect on the Web3Modal instance will open the modal and return a provider
     * @returns ethers.providers.Web3Provider (or undefined if not connected)
     */
   const connect = async () => {
	if (modal) {
		const provider = await onConnect(modal);
		return provider;
	}
	return undefined;
	}

/**
 * Connect to a specific chain (asking wallet to switch/add network before connecting)
 * @param chainId chainId to connect to
 * @returns 
 */
const connectTo = async (chainId) => {
	if (!window.ethereum) {
		throw Error('No web3 provider found');
	}
	if (!DEFAULT_CHAINS.hasOwnProperty(chainId)) {
		throw Error('Provided ChainId not supported. Supported chains are: ', DEFAULT_CHAINS);
	}
	const walletNetwork = window.ethereum.networkVersion;
	console.log('current and default wallet network: ', walletNetwork);
	if (walletNetwork !== chainId.toString()) {
		return window.ethereum.request({
			method: 'wallet_addEthereumChain',
			params: [
				{
					...DEFAULT_CHAINS[chainId.toString()],
				}
			]
		}).then(() => {
			return connect();
		}).catch((e) => {
			console.error(e);
			return undefined;
		});
	} else {
		return connect();
	}
};
////////////////////////////////////////////////////////
/**
 * Disconnect wallet
 */
const disconnect = () => {
	onDisconnect();
}
/////////////////////////////////////////////////////////

return (
	<Web3Context.Provider
		value={{
			wallet,
			provider,
			connect,
			connectTo,
			disconnect,
		}}
	>
		{children}
	</ Web3Context.Provider>
)
}