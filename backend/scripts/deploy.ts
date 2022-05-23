import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.getContractFactory("Club");
  // deploy the contract
  const contractDeploy = await contract.deploy();
  await contractDeploy.deployed();

  // print the address of the deployed contract
  console.log("Contract Deploy at", contractDeploy.address);

  console.log("Sleeping.....");
  // Wait for polygon to notice that the contract has been deployed
  await sleep(50000);

  // Verify the contract on polygon after deploying
  // @ts-ignore
  await hre.run("verify:verify", {
    address: contractDeploy.address,
    constructorArguments: [],
  });

  console.log("done");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
