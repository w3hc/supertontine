// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

/**
 * @dev NFT de membership de la DAO. Associé au contrat Gov.
 *
 *  - Permet un vote onchain sur l'acceptance d'un nouveau membre.
 *
 */
contract MembershipNFT {
    constructor() {}

    receive() external payable {
        payable(msg.sender).transfer(msg.value);
    }

    fallback() external payable {
        payable(msg.sender).transfer(msg.value);
    }
}
