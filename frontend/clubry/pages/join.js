import React from "react";
import AllStake from "../components/Join/AllStake";
import AvailStake from "../components/Join/AvailStake";
import TrendStake from "../components/Join/TrendStake";
import Header from "../components/layout/Header";

function Join() {
  return (
    <div>
      <Header />
      <AvailStake />
      <TrendStake />
      <AllStake />
    </div>
  );
}

export default Join;
