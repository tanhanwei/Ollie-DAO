import { ethers } from "ethers";
import { customDaoAbi } from "../abi/customDaoAbi";
import { uploadProposal } from "./web3Storage";
import { getJSON } from "./web3Storage";
import { ESFCreateFlowAbi } from "../abi/ESFCreateFlowAbi";

export const execute = async (
  daoSc,
  executionAddress,
  executionParams,
  isNewExecution,
  id
) => {
  //connect to blockchain network
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const customDao = new ethers.Contract(daoSc, customDaoAbi, provider);

  //call contract
  const signer = provider.getSigner();
  const customDaoSigner = customDao.connect(signer);
  console.log("executing...");
  const tx = await customDaoSigner.executeProposal(
    // TODO: try using await?
    "0x668a944D083ABE136f643d2d35046a7cD1f50f63",
    executionParams,
    isNewExecution,
    id
  );
  console.log(tx);
};

export const getExecutionParams = async (executionSc) => {
  let executionParams = {
    BOOL: [],
    INT: [],
    UINT: [],
    STRING: [],
    ADDRESS: [],
  };
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const executionContract = new ethers.Contract(
    executionSc,
    ESFCreateFlowAbi,
    provider
  );
  const BOOL = await executionContract.deBool();
  const INT = await executionContract.deInt();
  const UINT = await executionContract.deUint();
  const STRING = await executionContract.deString();
  const ADDRESS = await executionContract.deAddress();

  //console.log(response);
  executionParams.BOOL = BOOL;
  executionParams.INT = INT;
  executionParams.UINT = UINT;
  executionParams.STRING = STRING;
  executionParams.ADDRESS = ADDRESS;

  return executionParams;
};
