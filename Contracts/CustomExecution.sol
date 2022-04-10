// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;
import "https://github.com/tanhanwei/Ollie-DAO/blob/main/Contracts/DataTypes.sol";

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

    function execute (address _dao,
        bool[] memory _BOOL, 
        uint256[] memory _UINT, 
        int256[] memory _INT, 
        string[] memory _STRING, 
        address[] memory _ADDRESS, bool _isNewExecution, uint256 _id) public {
        //if it's a new execution assign a new Execution ID
        if (_isNewExecution) {
            _id = newExecution(_dao);
        } else {
            repeatExecution(_dao, _id);
        }

        customExecution(_dao, _id, _BOOL, _UINT, _INT, _STRING, _ADDRESS);
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
    function customExecution(address _dao, uint256 _executionId, bool[] memory _BOOL, 
        uint256[] memory _UINT, 
        int256[] memory _INT, 
        string[] memory _STRING, 
        address[] memory _ADDRESS) public virtual {
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

    // A utility to convert address to string
    function toAsciiString(address x) public pure returns (string memory) {
    bytes memory s = new bytes(40);
    for (uint i = 0; i < 20; i++) {
        bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
        bytes1 hi = bytes1(uint8(b) / 16);
        bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
        s[2*i] = char(hi);
        s[2*i+1] = char(lo);            
    }
    return string(s);
}

    function char(bytes1 b) public pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    function concatenate(string memory s1, string memory s2) public pure returns (string memory) {
        return string(abi.encodePacked(s1, s2));
    }
  
}