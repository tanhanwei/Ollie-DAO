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

        uint256 funds; //start with 0

    }

    enum Membership {
        erc721,
        erc20
    }

    //can be accessed by dao[PROJECT_ADDRESS]
    mapping(address => Dao) private dao;

    function createDAO(address _project, Membership _membership) public payable{
        require(msg.sender == getNftProjectOwner(_project), "Unauthorised");
        dao[_project] = Dao(msg.sender, _membership, 0);

    }

    function getNftProjectOwner (address _nft) private view returns (address){
        return INft(_nft).owner();
    }

    
}