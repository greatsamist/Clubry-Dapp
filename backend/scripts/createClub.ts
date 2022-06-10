import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import { ethers } from "hardhat";

async function create() {
  const factoryAddr = "0x94AA9ea5C6a51095c05f4578412bEDA41D4C57A4";
  const gnosisOwners = [
    "0x9268d03EfF4A9A595ef619764AFCB9976c0375df",
    "0x86541d0b80e078887175fcBb097Fc575707ED70B",
  ];
  const addressZero = "0x0000000000000000000000000000000000000000";

  // Let create a Club
  const factoryContract = await ethers.getContractAt(
    "ClubFactory",
    factoryAddr
  );
  const create = await factoryContract.createClub(
    gnosisOwners,
    "WizardDAO",
    "WDA",
    addressZero,
    1678364333,
    50,
    2
  );

  const createTx = await create.wait(1);

  console.log(
    createTx.events?.filter((e) => {
      return e.event === "NewClub";
    })
  );
}

create().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
