export const ESFCreateFlowAbi = [
  {
    inputs: [
      {
        internalType: "contract ISuperfluid",
        name: "host",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "cfaV1",
    outputs: [
      {
        internalType: "contract ISuperfluid",
        name: "host",
        type: "address",
      },
      {
        internalType: "contract IConstantFlowAgreementV1",
        name: "cfa",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes1",
        name: "b",
        type: "bytes1",
      },
    ],
    name: "char",
    outputs: [
      {
        internalType: "bytes1",
        name: "c",
        type: "bytes1",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dao",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "completeExecution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "s1",
        type: "string",
      },
      {
        internalType: "string",
        name: "s2",
        type: "string",
      },
    ],
    name: "concatenate",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dao",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "enum CustomExecutionContract.EvidenceType",
        name: "_type",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "createEvidence",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "int96",
        name: "flowRate",
        type: "int96",
      },
    ],
    name: "createFlow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dao",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_executionId",
        type: "uint256",
      },
      {
        internalType: "bool[]",
        name: "_BOOL",
        type: "bool[]",
      },
      {
        internalType: "uint256[]",
        name: "_UINT",
        type: "uint256[]",
      },
      {
        internalType: "int256[]",
        name: "_INT",
        type: "int256[]",
      },
      {
        internalType: "string[]",
        name: "_STRING",
        type: "string[]",
      },
      {
        internalType: "address[]",
        name: "_ADDRESS",
        type: "address[]",
      },
    ],
    name: "customExecution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dao",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_executionId",
        type: "uint256",
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
    ],
    name: "customExecution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "customUserInterface",
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
    inputs: [],
    name: "deAddress",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "deBool",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "deInt",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "deString",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "deUint",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "ethx",
    outputs: [
      {
        internalType: "contract ISETH",
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
        name: "_dao",
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
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getExecutionName",
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
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "setExecutionName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "x",
        type: "address",
      },
    ],
    name: "toAsciiString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
