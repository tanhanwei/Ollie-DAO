import { ethers } from "ethers";
import { customDaoAbi } from "../abi/customDaoAbi";
import { getAllProposals } from "./proposal";
import { getJSON } from "./web3Storage";

export const getDaoDetails = async (daoSc) => {
  let daoDetails = {
    name: "No Name",
    funds: "0 ETH",
    admins: "0 Owners",
    proposals: "0 Proposals",
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const customDao = new ethers.Contract(daoSc, customDaoAbi, provider);
  const response = await customDao.getDaoDetails();

  daoDetails.name = response["projectName"];
  daoDetails.funds = Number(response["funds"]["_hex"]).toString() + " ETH";
  daoDetails.admins = Number(response["admins"]["_hex"]).toString() + " Owners";
  daoDetails.proposals =
    Number(response["proposals"]["_hex"]).toString() + " Proposals";

  console.log(daoDetails);

  return daoDetails;
};

export const getProposal = async (daoSc, proposalId) => {
  const response = await getAllProposals(daoSc);
  //TODO: try catch or rewrite as an individual function
  return response[proposalId];
};
