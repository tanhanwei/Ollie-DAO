import { ethers } from "ethers";
import { ollieDaoABI } from "../abi/ollieDaoAbi";

export const getVerifiedExecutionContracts = async (ollieDaoSc) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const customDao = new ethers.Contract(ollieDaoSc, ollieDaoABI, provider);
  const response = await customDao.getAllVerifiedExecutionContract();

  return response;
};
