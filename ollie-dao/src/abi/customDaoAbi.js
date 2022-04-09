export const customDaoAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_creator",
        type: "address",
      },
      {
        internalType: "address",
        name: "_project",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isERC721",
        type: "bool",
      },
      {
        internalType: "address[]",
        name: "_admins",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "admins",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "creator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_execution",
        type: "address",
      },
      {
        components: [
          {
            internalType: "bool[]",
            name: "BOOL",
            type: "bool[]",
          },
          {
            internalType: "uint256[]",
            name: "UINT",
            type: "uint256[]",
          },
          {
            internalType: "int256[]",
            name: "INT",
            type: "int256[]",
          },
          {
            internalType: "string[]",
            name: "STRING",
            type: "string[]",
          },
          {
            internalType: "address[]",
            name: "ADDRESS",
            type: "address[]",
          },
        ],
        internalType: "struct DataTypes.ExecutionParams",
        name: "_executionParams",
        type: "tuple",
      },
      {
        internalType: "bool",
        name: "_isNewExecution",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "executeProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAdmins",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllProposals",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "details",
            type: "string",
          },
          {
            internalType: "enum CustomDao.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "enum CustomDao.Executor",
            name: "executor",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "evidence",
            type: "string",
          },
          {
            internalType: "address",
            name: "execution",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "votes",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "votedToken",
            type: "uint256[]",
          },
          {
            internalType: "address[]",
            name: "votedAccount",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "enum CustomDao.VoteType",
            name: "voteType",
            type: "uint8",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "challengeCount",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "isChallenged",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "challengeTo",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "challengeFrom",
                type: "uint256",
              },
            ],
            internalType: "struct CustomDao.Challenge",
            name: "challenge",
            type: "tuple",
          },
        ],
        internalType: "struct CustomDao.Proposal[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDaoDetails",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "projectName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "funds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "admins",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "proposals",
            type: "uint256",
          },
        ],
        internalType: "struct CustomDao.DaoDetails",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProjectName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getProposal",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "details",
            type: "string",
          },
          {
            internalType: "enum CustomDao.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "enum CustomDao.Executor",
            name: "executor",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "evidence",
            type: "string",
          },
          {
            internalType: "address",
            name: "execution",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "votes",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "votedToken",
            type: "uint256[]",
          },
          {
            internalType: "address[]",
            name: "votedAccount",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "enum CustomDao.VoteType",
            name: "voteType",
            type: "uint8",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "challengeCount",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "isChallenged",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "challengeTo",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "challengeFrom",
                type: "uint256",
              },
            ],
            internalType: "struct CustomDao.Challenge",
            name: "challenge",
            type: "tuple",
          },
        ],
        internalType: "struct CustomDao.Proposal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isTokenOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "project",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposals",
    outputs: [
      {
        internalType: "string",
        name: "details",
        type: "string",
      },
      {
        internalType: "enum CustomDao.Status",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "enum CustomDao.Executor",
        name: "executor",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "evidence",
        type: "string",
      },
      {
        internalType: "address",
        name: "execution",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "votes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        internalType: "enum CustomDao.VoteType",
        name: "voteType",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "challengeCount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isChallenged",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "challengeTo",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "challengeFrom",
            type: "uint256",
          },
        ],
        internalType: "struct CustomDao.Challenge",
        name: "challenge",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_details",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_executor",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_execution",
        type: "address",
      },
      {
        internalType: "enum CustomDao.VoteType",
        name: "_voteType",
        type: "uint8",
      },
    ],
    name: "propose",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
