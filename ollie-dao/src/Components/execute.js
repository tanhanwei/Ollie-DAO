import { ethers } from "ethers";
import { customDaoAbi } from "../abi/customDaoAbi";
import { uploadProposal } from "./web3Storage";
import { getJSON } from "./web3Storage";
import { ESFCreateFlowAbi } from "../abi/ESFCreateFlowAbi";

export const execute = async (
  executionAddress,
  executionParams,
  isNewExecution,
  id
) => {
  let ExecutionParams = {
    BOOL: [],
    INT: [],
    UINT: [],
    STRING: [],
    ADDRESS: [],
  };
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
