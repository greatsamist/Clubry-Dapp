import React from "react";
import AllClubs from "../components/Join/AllClubs";
import AvailClubs from "../components/Join/AvailClubs";
import TrendClubs from "../components/Join/TrendClubs";
import Header from "../components/layout/Header";

function Join() {
  return (
    <div>
      <Header />
      <AvailClubs />
      <TrendClubs />
      <AllClubs />
    </div>
  );
}

export default Join;
