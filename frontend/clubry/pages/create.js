import { useContext, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CreateForm from "../components/Create/CreateForm";

import { FactoryAddr, FactoryAbi, clubryAbi } from "../constants";
import { Web3Context } from "../contexts/Web3Context";
import { Contract, ethers } from "ethers";

function Create() {
  const { provider, connect } = useContext(Web3Context);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const onClickCreate = async (e) => {
    e.preventDefault();
    try {
      if (!provider) {
        alert("connect wallet to mumbai network and try again");
        await connect();
        return;
      }
      let data = {
        clubName: e.target.clubName.value, // string
        member: Number(e.target.member.value), // number
        stake: Number(e.target.stake.value), // number
        desc: e.target.desc.value, // string
      };
      console.log(data);

      setSubmitting(true);
      const signer = provider.getSigner();
      const FactoryContractInstance = new Contract(
        FactoryAddr,
        FactoryAbi,
        signer
      );

      const createClubContract = await FactoryContractInstance.createClub();

      const receipt = await createClubContract.wait();
      // Get the events
      const events = receipt?.events[0].address;

      const ClubAddress = events.toString();
      console.log(`New club address is` + ClubAddress);
      //////////////////////////////////////////////////

      // const ClubContractInstance = new Contract(ClubAddress, clubryAbi, signer);

      // const setClub = await ClubContractInstance.createClub(
      //   data.member,
      //   data.stake
      // );

      // await setClub.wait();

      setCompleted(true);
      setSubmitting(false);
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
    return undefined;
  };

  return (
    <div>
      <Header />
      <CreateForm
        completed={completed}
        submitting={submitting}
        onClickCreate={onClickCreate}
      />
      <Footer />
    </div>
  );
}

export default Create;
