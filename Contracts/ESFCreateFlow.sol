// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "https://github.com/tanhanwei/Ollie-DAO/blob/main/Contracts/CustomExecution.sol";

import { 
    ISuperfluid, ISuperfluidToken, ISuperToken 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol"; //"@superfluid-finance/ethereum-monorepo/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { 
    IConstantFlowAgreementV1 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {
    CFAv1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

import {ISETH} from "https://github.com/superfluid-finance/protocol-monorepo/blob/a86bfd102b83d9c41e1b51b5ae3cdd159f60d890/packages/ethereum-contracts/contracts/interfaces/tokens/ISETH.sol";

contract ESFCreateFlow is CustomExecutionContract{

    //Rinkeby
    ISETH public ethx = ISETH(0xa623b2DD931C5162b7a0B25852f4024Db48bb1A0);

    receive() external payable {
        ethx.upgradeByETH{value: msg.value}();
    }

    using CFAv1Library for CFAv1Library.InitData;

    //initialize cfaV1 variable
    CFAv1Library.InitData public cfaV1;

    constructor(ISuperfluid host) {
        setExecutionName("SuperFluid - Create Flow");
        //initialize InitData struct, and set equal to cfaV1
        cfaV1 = CFAv1Library.InitData(
            host,
            IConstantFlowAgreementV1(
                address(
                    host.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
                        )
                    )
                )
            )
        );
    }

    function createFlow(ISuperfluidToken token, address receiver, int96 flowRate) public {
        cfaV1.createFlow(receiver, token, flowRate);
    }

    // enum EvidenceType {
    //     TEXT, --0
    //     NUMBER, --1
    //     IMAGE, --2
    //     VIDEO, --3
    //     MIXED, --4
    //     URL --5
    // }

    /*Parameter LUT for Generic:
        BOOL = []
        UINT = [EVIDENCE_TYPE]
        INT = [FLOWRATE]
        STRING = [EVIDENCE_URL]
        ADDRESS = [TOKEN_ADDRESS, RECEIVER]
    */

    function customExecution(address _dao, uint256 _id, ExecutionParams memory _executionParams) public override {
        //CUSTOMIZE YOUR EXECUTION HERE

        string memory evidence = "https://console.superfluid.finance/rinkeby/accounts/" + toAsciiString(_executionParams.ADDRESS[1]);

        createFlow(ISuperfluidToken(_executionParams.ADDRESS[0]), _executionParams.ADDRESS[1], int96(_executionParams.INT[1]));

        //createEvidence(DAO_ADDRESS, EVIDENCE_TYPE, EVIDENCE)
        createEvidence(_dao, _id, EvidenceType(_executionParams.UINT[0]), _executionParams.STRING[0]);
        completeExecution(_dao, _id);
    }

}
