import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
require("@nomiclabs/hardhat-waffle");
// require("dotenv").config({ path: ".env" });
import * as dotenv from "dotenv";
dotenv.config();


const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL || "";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY || "";


module.exports = {
  solidity: "0.8.8",
  networks: {
    mumbai: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_KEY,
    },
  },
};


// import * as dotenv from "dotenv";

// import { HardhatUserConfig, task } from "hardhat/config";
// import "@nomiclabs/hardhat-etherscan";
// import "@nomiclabs/hardhat-waffle";
// import "@typechain/hardhat";
// import "hardhat-gas-reporter";
// import "solidity-coverage";
// import "@nomiclabs/hardhat-etherscan";

// dotenv.config();

// // This is a sample Hardhat task. To learn how to create your own go to
// // https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more

// const config = {
//   solidity: "0.8.4",
//   networks: {
//     polygon: {
//       url: process.env.POLYGON_RPC_URL || "",
//       accounts:
//         process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
//         gas: 2100000,
//         gasPrice: 80000000000,
//     }
//   },
//   gasReporter: {
//     enabled: process.env.REPORT_GAS !== undefined,
//     currency: "USD",
//   },
//   etherscan: {
//     apiKey: {
//       polygonMumbai: process.env.POLYGON_API_KEY,
//     }
//   },
// };

// export default config;
