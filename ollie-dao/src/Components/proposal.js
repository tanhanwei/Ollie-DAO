import { ethers } from "ethers";
import { customDaoAbi } from "../abi/customDaoAbi";
import { uploadProposal } from "./web3Storage";
import { getJSON } from "./web3Storage";

//propose(string memory _details, uint256 _executor, uint _duration, address _execution, VoteType _voteType)
export const createProposal = async (
  daoSc,
  title,
  details,
  executor,
  duration,
  execution,
  votetype
) => {
  //upload to IPFS
  const cid = await uploadProposal(title, details);
  const url = "https://ipfs.io/ipfs/" + cid + "/proposal.json";
  console.log(url);

  //connect to blockchain network
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const customDao = new ethers.Contract(daoSc, customDaoAbi, provider);

  //call contract
  const signer = provider.getSigner();
  const customDaoSigner = customDao.connect(signer);
  const tx = await customDaoSigner.propose(
    // TODO: try using await?
    url,
    executor,
    duration,
    execution,
    votetype
  );
  console.log(tx);
};

export const getAllProposals = async (daoSc) => {
  var proposals = Array();
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

  //console.log(proposals);
  console.log(response);
  return proposals;
};
