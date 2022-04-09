// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "https://github.com/tanhanwei/Ollie-DAO/blob/main/Contracts/CustomExecution.sol";

//This is the template to create custom on-chain execution codes for Ollie DAO
contract EExecutionName is CustomExecutionContract {

    constructor() {
        //setExecutionName("EXECUTION_NAME");
    }

    /*
        struct Evidence {
            string evidenceUri;
            EvidenceType evidenceType;
        }

        EvidenceType:
            0: TEXT
            1: NUMBER
            2: IMAGE
            3: VIDEO
            4: MIXED
            5: URL

        Parameter LUT for EXECUTION_NAME based on ExecutionParams struct:
            BOOL = []
            INT = []
            UINT = []
            STRING = []
            ADDRESS = []
    */
    function customExecution(address _dao, uint256 _id, ExecutionParams memory _executionParams) public override {
        //CUSTOMIZE YOUR EXECUTION HERE

        //Create evidence based on Parameter LUT received
        //createEvidence(_dao, _id, EvidenceType(_executionParams.UINT[0]), _executionParams.STRING[0]);
        completeExecution(_dao, _id);
    }

    //ADD YOUR CUSTOM CODE BELOW
    
}
