import { ethers } from "ethers";
import { customDaoAbi } from "../abi/customDaoAbi";
import { getJSON } from "./web3Storage";

var proposals = Array();

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

export const getAllProposals = async (daoSc) => {
  //convert proposals to objects

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const customDao = new ethers.Contract(daoSc, customDaoAbi, provider);
  const response = await customDao.getAllProposals();

  for (let i = 0; i < response.length; i++) {
    var proposal = {
      title: "",
      details: "", //ipfs json file
      status: 0,
      executor: 0,
      duration: 0,
      evidence: "", //TODO link evidence from custom execution contract
      execution: "", //smart contract that handles execution

      votes: 0,
      votedToken: [], //for ERC721
      votedAccount: [], //for ERC20
      totalSupply: 0,
      voteType: 0,

      //Challenge: challenge //TODO chain the challenge to proposal
    };
    let data = await getJSON(response[i]["details"]);

    proposal.title = data.title;
    proposal.details = data.details;
    proposal.status = response[i]["status"];
    proposal.executor = response[i]["executor"];
    proposal.duration = Number(response[i]["duration"]["_hex"])
      ? Number(response[i]["duration"]["_hex"])
      : 0;
    proposal.evidence = response[i]["evidence"];
    proposal.execution = response[i]["execution"];
    proposal.votes = Number(response[i]["hex"])
      ? Number(response[i]["hex"])
      : 0;
    proposal.votedToken = response[i]["votedToken"];
    proposal.votedAccount = response[i]["votedAccount"];
    proposal.totalSupply = Number(response[i]["_hex"])
      ? Number(response[i]["_hex"])
      : 0;
    proposal.voteType = response[i]["voteType"];
    //console.log(proposal);

    proposals.push(proposal);
    // console.log("push");
    // console.log(proposals);
  }

  console.log(proposals);
  //console.log(response[3]["details"]);
  return proposals;
};
