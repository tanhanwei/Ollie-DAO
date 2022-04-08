// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract CustomExecutionContract {

    string executionName;

    // Map DAO address to an array of Execution ID, which contains execution details
    mapping (address => Execution[]) dao;

    struct Execution {
        bool exist;
        bool isComplete;
        uint256 attempt;
        Evidence evidence;
    }

    //Lookup Table for Execution Parameters
    //Every custom execution will have its own LUT
    struct ExecutionParams {
        bool[] BOOL;
        uint256[] UINT;
        string[] STRING;
        address[] ADDRESS;
    }

    struct Evidence {
        string evidenceUri; //can also be pure string
        EvidenceType evidenceType;
    }

    enum EvidenceType {
        TEXT,
        NUMBER,
        IMAGE,
        VIDEO,
        MIXED,
        URL
    }

    function setExecutionName(string memory _name) public {
        executionName = _name;
    }

    function getExecutionName() public view returns (string memory) {
        return executionName;
    }

    function execute (address _dao, ExecutionParams memory _executionParams, bool _isNewExecution, uint256 _id) public {
        //if it's a new execution assign a new Execution ID
        if (_isNewExecution) {
            _id = newExecution(_dao);
        } else {
            repeatExecution(_dao, _id);
        }

        customExecution(_dao, _id, _executionParams);
    }

    function newExecution(address _dao) private returns (uint) {
        Execution memory execution;
        execution.exist = true;
        execution.isComplete = false;
        execution.attempt = 0;

        dao[_dao].push(execution);

        return dao[_dao].length -1;
    }

    function repeatExecution(address _dao, uint256 _id) private {
        require(dao[_dao][_id].exist, "Invalid Execution ID");
        dao[_dao][_id].attempt++;
    }

    // Custom execution is private in case of malicious use.
    function customExecution(address _dao, uint256 _executionId, ExecutionParams memory _executionParams) public virtual {
        //OVERRIDE WITH YOUR CUSTOM EXECUTION IN YOUR SMART CONTRACT
    }

    function createEvidence(address _dao, uint256 _id, EvidenceType _type, string memory _uri) public virtual {
        dao[_dao][_id].evidence.evidenceType = _type;
        dao[_dao][_id].evidence.evidenceUri = _uri;
    }

    function completeExecution(address _dao, uint256 _id) public virtual {
        dao[_dao][_id].isComplete = true;
    }

    function customUserInterface() public virtual view returns (string memory) {

    }
  
}