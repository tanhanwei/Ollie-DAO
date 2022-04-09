import { ethers } from "ethers";
import { customDaoAbi } from "../abi/customDaoAbi";

const getAllProposals = async (daoSc) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const customDao = new ethers.Contract(daoSc, customDaoAbi, provider);
  const response = await customDao.getAllProposals();

  console.log(response);
};

export const createProposal = async (daoSc) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const customDao = new ethers.Contract(daoSc, customDaoAbi, provider);

  const signer = provider.getSigner();
  const customDaoSigner = customDao.connect(signer);
  const tx = customDaoSigner.propose(
    "ipfs://tada",
    1,
    2,
    "0x2c6A9A4A096Ae6a265B70FF31Fb219B78bCBCBF4",
    1
  );
  console.log(tx);
};
