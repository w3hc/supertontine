// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

/**
 * @dev Contrat de gouvernance. Associé au contrat MembershipNFT.
 *
 *  - Permet un vote onchain sur l'acceptance d'un nouveau membre.
 *
 */
contract Gov {
    constructor() {}

    receive() external payable {
        payable(msg.sender).transfer(msg.value);
    }

    fallback() external payable {
        payable(msg.sender).transfer(msg.value);
    }
}
