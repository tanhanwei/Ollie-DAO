import { ethers } from "ethers";
import { OllieDAOSc } from "../network";
import { ollieDaoABI } from "../abi/ollieDaoAbi";

var signer;
window.provider = new ethers.providers.Web3Provider(window.ethereum);
var ollieDao;

export const getAddress = async () => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page

  // TODO Check if Metamask is installed

  //provider = new ethers.providers.Web3Provider(window.ethereum);

  // MetaMask requisres requesting permission to connect users accounts
  await window.provider.send("eth_requestAccounts", []);

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  signer = window.provider.getSigner();
  const address = await signer.getAddress();
  //console.log("Account:", await signer.getAddress());
  //await signer.signMessage("Hello World");
  return address;
};

export const signMessage = async () => {
  console.log("Getting Signature");
  // BUG Signature request appears multiple times after switching account
  const signature = await signer.signMessage("Hello World");
  console.log("Signed: " + signature);
};

export const connectOllieDaoContract = () => {
  ollieDao = new ethers.Contract(OllieDAOSc, ollieDaoABI, window.provider);
};

export const getAllDaos = async () => {
  const allDaos = await ollieDao.getAllDaos();
  console.log(allDaos);
};
