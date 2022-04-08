// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface INft {
    function owner() external view returns (address);
    //function name() external view returns (string);
    //function createProfile(DataTypes.CreateProfileData calldata vars) external;
}

contract OllieDAO {

    struct Dao {
        address createdBy;
        Membership membership;
        address[] boardMembers;

        uint256 funds; //start with 0
    }

    struct Proposal {
        string details; //ipfs json file
        Status status;
        Executor executor;
        uint duration;
        string evidence;
        address execution; //smart contract that handles execution
    }

    enum Executor {
        PROPOSER,
        BOARD,
        OPEN
    }

    enum Status {
        OPEN,
        CHALLENGED,
        COMPLETED,
        REJECTED
    }

    enum Membership {
        erc721,
        erc20
    }

    //can be accessed by dao[PROJECT_ADDRESS]
    mapping(address => Dao) private dao;

    function createDAO(address _project, Membership _membership) public payable{
        require(msg.sender == getNftProjectOwner(_project), "Unauthorised");
        address[] memory boardMember;
        boardMember[0] = msg.sender;
        dao[_project] = Dao(msg.sender, _membership, boardMember, 0);

    }

    function getNftProjectOwner (address _nft) private view returns (address){
        return INft(_nft).owner();
    }

    
}