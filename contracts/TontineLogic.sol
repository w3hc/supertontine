// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import {RedirectAll, ISuperToken, ISuperfluid} from "./RedirectAll.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @dev Décrit la logique principale de la Tontine.
 *
 *  - Désigne un ID du contrat MembershipNFT "à tour de rôle" en tant que cible du flux.
 *  - Les flux entrants sont régis par le module de Subscriptions de Superfluid.
 *
 */
contract TontineLogic is RedirectAll {
    uint256 public roundDuration;
    uint256 public monthlyContribAmount;
    uint256 public currentPeriod;
    uint256 public currentID;
    address public membershipNFTAddress;

    // host on Goerli maybe 0x3E14dC1b13c488a8d5D310918780c983bD5982E7
    constructor(
        uint256 _roundDuration,
        uint256 _monthlyContribAmount,
        ISuperToken _acceptedToken,
        ISuperfluid _host,
        address _owner,
        address _membershipNFTAddress
    ) RedirectAll(_acceptedToken, _host, _owner) {
        roundDuration = _roundDuration;
        monthlyContribAmount = _monthlyContribAmount;
        currentPeriod = block.timestamp;
        currentID = 0;
        membershipNFTAddress = _membershipNFTAddress;
    }

    function setReceiver() public {
        require(
            (currentPeriod + 4 weeks) < block.timestamp,
            "Too soon to switch"
        );
        address to = ERC721(membershipNFTAddress).ownerOf(currentID + 1);
        _changeReceiver(to);
        currentID++;
    }

    receive() external payable {
        payable(msg.sender).transfer(msg.value);
    }

    fallback() external payable {
        payable(msg.sender).transfer(msg.value);
    }
}
