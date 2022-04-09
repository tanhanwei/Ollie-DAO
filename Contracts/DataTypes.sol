// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

library DataTypes {
    //Lookup Table for Execution Parameters
    //Every custom execution will have its own LUT
    struct ExecutionParams {
        bool[] BOOL;
        uint256[] UINT;
        int256[] INT;
        string[] STRING;
        address[] ADDRESS;
    }
}