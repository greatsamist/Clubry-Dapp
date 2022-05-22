import { useContext, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CreateForm from "../components/Create/CreateForm";

import { clubryContractAddr, clubryAbi } from "../constants";
import { Web3Context } from "../contexts/Web3Context";
import { ethers } from "ethers";

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
        // console.log(data)
      };
      setSubmitting(true);

      const signer = provider.getSigner();
      console.log(signer);
      console.log(provider);
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
