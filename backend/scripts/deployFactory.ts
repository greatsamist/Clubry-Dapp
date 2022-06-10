import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import { ethers } from "hardhat";

async function main() {
  // Lets deploy club contract
  const factory = await ethers.getContractFactory("ClubFactory");
  // deploy the factory
  const factoryDeploy = await factory.deploy(
    "0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2",
    "0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552"
  );
  await factoryDeploy.deployed();

  // print the address of the deployed contract
  console.log("ClubFactory Contract Deploy at", factoryDeploy.address);

  console.log("Sleeping.....");
  // Wait for polygon to notice that the contract has been deployed
  await sleep(50000);

  // Verify the contract on polygon after deploying
  // @ts-ignore
  await hre.run("verify:verify", {
    address: factoryDeploy.address,
    constructorArguments: [
      "0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2",
      "0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552",
    ],
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
