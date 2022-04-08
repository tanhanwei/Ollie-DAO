// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "https://github.com/tanhanwei/Ollie-DAO/blob/main/Contracts/CustomExecution.sol";

contract EExecutionName is CustomExecutionContract {
        //------------------------CUSTOM CODES------------------------------------------



    // struct ExecutionParams {
    //     bool[] BOOL;
    //     uint256[] UINT;
    //     string[] STRING;
    //     address[] ADRESS;
    // }
    // struct Evidence {
    //     string evidenceUri;
    //     EvidenceType evidenceType;
    // }

    // enum EvidenceType {
    //     TEXT,
    //     NUMBER,
    //     IMAGE,
    //     VIDEO,
    //     MIXED
    // }
    constructor() {
        //setExecutionName("Generic");
    }
    /*Parameter LUT for Generic:
        UINT = []
        STRING = []
    */
    function customExecution(address _dao, uint256 _id, ExecutionParams memory _executionParams) public override {
        //CUSTOMIZE YOUR EXECUTION HERE
        //createEvidence(_dao, _id, EvidenceType(_executionParams.UINT[0]), _executionParams.STRING[0]);
        //completeExecution(_dao, _id);
    }
}
