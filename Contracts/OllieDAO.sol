// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface INft {
    function owner() external view returns (address);
    function name() external view returns (string calldata);
    function balanceOf(address) external view returns (uint256);
    //function createProfile(DataTypes.CreateProfileData calldata vars) external;
}

interface ICrypto {
    function balanceOf(address) external view returns (uint256);
}

interface IDao {
    function getAdmins() external view returns (address[] calldata);
}

contract OllieDAO {

    address[] daos;

    struct Dao {
        address dao;
        address creator;
        bool isERC721;
        bool exist;
    }

    mapping (address => Dao) project; //1 Project, 1 DAO. We'll use project address to query for dao address

    function createDAO(address _project, bool _isERC721, address[] memory _admins) public payable{
        require(msg.sender == getNftProjectOwner(_project), "Unauthorised, user is not the project owner.");
        require(!project[_project].exist, "Project exists in DAO");

        CustomDao dao = new CustomDao(msg.sender, _project, _isERC721, _admins);
        
        project[_project].dao = address(dao);
        project[_project].creator = msg.sender;
        project[_project].isERC721 = _isERC721;
        project[_project].exist = true;

        daos.push(address(dao));
    }

    function getNftProjectOwner (address _nft) private view returns (address){
        return INft(_nft).owner();
    }

    function getAllDaos() public view returns (address[] memory) {
        return daos;
    }

    function getDaoAdmins(address dao) public view returns (address[] memory){
        return IDao(dao).getAdmins();
    }

}

contract CustomDao {
    struct Dao {
        address creator;
        address project;
        bool isERC721;
        address[] admins;
        Proposal[] proposals;
    }

    Dao dao;

    address public creator;
    address public project;
    bool isERC721; //if false, then it's ERC20
    address[] public admins;
    Proposal[] public proposals; //calling as Proposal[ID]

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
        ADMIN,
        OPEN
    }

    enum Status {
        OPEN,
        CHALLENGED,
        COMPLETED,
        REJECTED
    }

    constructor(address _creator, address _project, bool _isERC721, address[] memory _admins){
        dao.creator = _creator;
        dao.project = _project;
        dao.isERC721 = _isERC721;
        dao.admins = _admins;
    }

    // TODO Don't overload data return
    function getDao() public view returns (Dao memory){
        return dao;
    }

    function getAdmins() public view returns (address[] memory){
        return dao.admins;
    }

    function getProjectName() public view returns (string memory) {
        return INft(project).name();
    }

    function isTokenOwner() public view returns (bool){
        if (dao.isERC721) {
            if (INft(project).balanceOf(msg.sender) > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            if (ICrypto(project).balanceOf(msg.sender) > 0){
                return true;
            } else {
                return false;
            }
        }
    }

    function propose(string memory _details, Executor _executor, uint _duration, address _execution) public payable {
        require(isTokenOwner(), "Not a member");
        Proposal memory newProposal;
        newProposal.details = _details;
        newProposal.status = Status.OPEN;
        newProposal.executor = _executor; //TODO how to pass from front end??
        newProposal.duration = _duration;
        newProposal.evidence = "None";
        newProposal.execution = _execution; 
    }

    // string details; //ipfs json file
    //     Status status;
    //     Executor executor;
    //     uint duration;
    //     string evidence;
    //     address execution; 

}