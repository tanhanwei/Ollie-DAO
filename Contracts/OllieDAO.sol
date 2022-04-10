// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "https://github.com/tanhanwei/Ollie-DAO/blob/main/Contracts/DataTypes.sol";

interface IToken {
    function owner() external view returns (address);
    function name() external view returns (string calldata);
    function balanceOf(address) external view returns (uint256);
    function totalSupply() external view returns (uint256);
}

interface IDao {
    function getAdmins() external view returns (address[] calldata);
}

interface IExecution {
    function execute (address _dao, bool[] memory _BOOL, uint256[] memory _UINT, int256[] memory _INT, string[] memory _STRING, address[] memory _ADDRESS, bool _isNewExecution, uint256 _id) external;
}

contract OllieDAO {

    address[] daos;
    address[] verifiedExecutionContract;

    struct Dao {
        address dao;
        address creator;
        bool isERC721;
        bool exist;
    }

    // Map Wallet ID to get DAO address
    mapping (address => address[]) userDaos; //accessed by userDaos[WALLET_ADD][n] to get Dao address

    mapping (address => Dao) project; //1 Project, 1 DAO. We'll use token project address to query for dao address

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
        return IToken(_nft).owner();
    }

    function getAllDaos() public view returns (address[] memory) {
        return daos;
    }

    function getDaoAdmins(address dao) public view returns (address[] memory){
        return IDao(dao).getAdmins();
    }

    function addUserDao(address _dao) public {
        userDaos[msg.sender].push(_dao);
    }

    //TODO: Permission to Ollie DAO admins only
    function addVerifiedExecutionContract(address _executionContract) public {
        verifiedExecutionContract.push(_executionContract);
    }

    function getAllVerifiedExecutionContract() public view returns (address[] memory) {
        return verifiedExecutionContract;
    }

}

contract CustomDao {
    // struct Dao {
    //     address creator;
    //     address project;
    //     bool isERC721;
    //     address[] admins;
    //     Proposal[] proposals;
    // }

    //Dao dao;

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
        string evidence; //TODO link evidence from custom execution contract
        address execution; //smart contract that handles execution

        uint256 votes;
        uint256[] votedToken; //for ERC721
        address[] votedAccount; //for ERC20
        uint256 totalSupply;
        VoteType voteType;
        
        Challenge challenge; //TODO chain the challenge to proposal
    }

    struct Challenge {
        uint256 challengeCount;
        bool isChallenged;
        uint256 challengeTo;
        uint256 challengeFrom;
    }

    //Generic parameters for ANY execution smart contract (to be TRANSPOSED)
    struct ExecutionParams {
        bool[] BOOL;
        uint256[] UINT;
        string[] STRING;
        address[] ADRESS;
    }

    //Relative
    //- Min no. of vote = total no. of admins (All admins must vote)
    //- To win, needs 2/3 of total votes
    //Absolute
    //- Min no. of votes = totalSupply
    //-To win, needs 2/3 of totalSupply
    enum VoteType {
        RELATIVE,
        ABSOLUTE
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
        // dao.creator = _creator;
        // dao.project = _project;
        // dao.isERC721 = _isERC721;
        // dao.admins = _admins;

        creator = _creator;
        project = _project;
        isERC721 = _isERC721;
        admins = _admins;
    }

    // TODO Don't overload data return
    // function getDao() public view returns (Dao memory){
    //     return dao;
    // }

    function getAdmins() public view returns (address[] memory){
        return admins;
    }

    function getProjectName() public view returns (string memory) {
        return IToken(project).name();
    }

    function isTokenOwner() public view returns (bool){
        if (isERC721) {
            if (IToken(project).balanceOf(msg.sender) > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            if (IToken(project).balanceOf(msg.sender) > 0){
                return true;
            } else {
                return false;
            }
        }
    }

    function propose(string memory _details, uint256 _executor, uint _duration, address _execution, VoteType _voteType) public payable {
        require(isTokenOwner(), "Not a member");
        Proposal memory newProposal;
        newProposal.details = _details; //uri of proposal details
        newProposal.status = Status.OPEN;
        newProposal.executor = Executor(_executor); //Pass INTEGER and type cast to Executor Type
        newProposal.duration = _duration;
        newProposal.evidence = "None";
        newProposal.execution = _execution;
        newProposal.votes = 0;
        newProposal.totalSupply = getTotalSupply();
        newProposal.voteType = _voteType;

        proposals.push(newProposal);
    }

    function getTotalSupply() public view returns (uint256) {
        return IToken(project).totalSupply();
    }

    function getProposal(uint256 _id) public view returns (Proposal memory) {
        return proposals[_id];
    }

    struct DaoDetails {
        string projectName;
        uint256 funds;
        uint256 admins;
        uint256 proposals;
    }

    function getDaoDetails() public view returns (DaoDetails memory) {
        DaoDetails memory daoDetails;

        daoDetails.projectName = getProjectName();
        daoDetails.funds = address(this).balance;
        daoDetails.admins = admins.length;
        daoDetails.proposals =  proposals.length;

        return daoDetails;

    }

    function getAllProposals() public view returns (Proposal[] memory) {
        return proposals;
    }
    // string details; //ipfs json file
    //     Status status;
    //     Executor executor;
    //     uint duration;
    //     string evidence;
    //     address execution; 

    function executeProposal(
        address _execution, 
        bool[] memory _BOOL, 
        uint256[] memory _UINT, 
        int256[] memory _INT, 
        string[] memory _STRING, 
        address[] memory _ADDRESS, 
        bool _isNewExecution, 
        uint256 _id) 
        
        public {
        IExecution(_execution).execute(address(this), _BOOL, _UINT, _INT, _STRING, _ADDRESS, _isNewExecution, _id);
    }

}