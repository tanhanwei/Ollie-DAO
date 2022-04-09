import { ethers } from "ethers";
import { customDaoAbi } from "../abi/customDaoAbi";
import { uploadProposal } from "./web3Storage";

const getAllProposals = async (daoSc) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const customDao = new ethers.Contract(daoSc, customDaoAbi, provider);
  const response = await customDao.getAllProposals();

  console.log(response);
};

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
  const tx = customDaoSigner.propose(
    url,
    executor,
    duration,
    execution,
    votetype
  );
  console.log(tx);
};
