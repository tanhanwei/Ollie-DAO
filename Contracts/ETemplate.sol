// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "https://github.com/tanhanwei/Ollie-DAO/blob/ParallelParams/Contracts/CustomExecution.sol";

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
    function customExecution(address _dao, uint256 _id, bool[] memory _BOOL, 
        uint256[] memory _UINT, 
        int256[] memory _INT, 
        string[] memory _STRING, 
        address[] memory _ADDRESS) override public  {
        //CUSTOMIZE YOUR EXECUTION HERE

        //Create evidence based on Parameter LUT received
        //createEvidence(_dao, _id, EvidenceType(_UINT[0]), _STRING[0]);
        completeExecution(_dao, _id);
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
        DUINT[0] = "Nil";
        return DUINT;
    }

    function deString () public pure returns (string[] memory) {
        string[] memory DSTRING = new string[](1);
        DSTRING[0] = "Nil";
        return DSTRING;
    }

    function deAddress () public pure returns (string[] memory) {
        string[] memory DADDRESS = new string[](2);
        DADDRESS[0] = "Nil";
        return DADDRESS;
    }
    
}
