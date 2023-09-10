// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

/**
 * @dev Décrit la logique principale de la Tontine.
 *
 *  - Désigne un ID du contrat MembershipNFT "à tour de rôle" en tant que cible du flux.
 *  - Les flux entrants sont régis par le module de Subscriptions de Superfluid.
 *
 */
contract TontineLogic {
    constructor() {}

    receive() external payable {
        payable(msg.sender).transfer(msg.value);
    }

    fallback() external payable {
        payable(msg.sender).transfer(msg.value);
    }
}
