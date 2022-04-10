// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "https://github.com/tanhanwei/Ollie-DAO/blob/main/Contracts/CustomExecution.sol";
import "https://github.com/tanhanwei/Ollie-DAO/blob/main/Contracts/DataTypes.sol";

contract EGeneric is CustomExecutionContract {

    constructor() {
        setExecutionName("Generic");
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
            UINT = [EVIDENCE_TYPE]
            STRING = [EVIDENCE_URI]
            ADDRESS = []
    */

    function customExecution(address _dao, uint256 _id, bool[] memory _BOOL, 
        uint256[] memory _UINT, 
        int256[] memory _INT, 
        string[] memory _STRING, 
        address[] memory _ADDRESS) public {
        //CUSTOMIZE YOUR EXECUTION HERE
        createEvidence(_dao, _id, EvidenceType(_UINT[0]), _STRING[0]);
        completeExecution(_dao, _id);
    }

    struct ReverseExecutionParams {
            string[] BOOL;
            string[] INT;
            string[] UINT;
            string[] STRING;
            string[] ADDRESS;
    }

    function deLUTExecutionParams() public pure returns (ReverseExecutionParams memory){
        ReverseExecutionParams memory executionParams;

        executionParams.UINT[0] = "Evidence Type";
        executionParams.STRING[0] = "Evidence Uri";
        return executionParams;
    }

    //Use these to generate dynamic UI
    function deBool () public pure returns (string[] memory) {
        string[] memory BOOL = new string[](1);
        BOOL[0] = "Nil";
        return BOOL;
    }

    function deInt () public pure returns (string[] memory) {
        string[] memory DINT = new string[](1);
        DINT[0] = "Nil";
        return DINT;
    }

    function deUint () public pure returns (string[] memory) {
        string[] memory DUINT = new string[](1);
        DUINT[0] = "Evidence Type";
        return DUINT;
    }

    function deString () public pure returns (string[] memory) {
        string[] memory DSTRING = new string[](1);
        DSTRING[0] = "Evidence URI";
        return DSTRING;
    }

    function deAddress () public pure returns (string[] memory) {
        string[] memory DADDRESS = new string[](2);
        DADDRESS[0] = "Nil";
        return DADDRESS;
    }

}
