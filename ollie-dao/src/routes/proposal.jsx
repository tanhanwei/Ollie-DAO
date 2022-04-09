import React from "react";
import { useParams } from "react-router-dom";

const Proposal = () => {
  const { daoAddress } = useParams();
  const { proposalId } = useParams();
  return (
    <div>
      Proposal No {proposalId} for {daoAddress}
    </div>
  );
};

export default Proposal;
