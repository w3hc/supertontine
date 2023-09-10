// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

/**
 * @dev Gère la mécanique de caution.
 *
 *  - Un wallet tiers se porte garant et met en jeu l'équivalent d'un a de participation/cotisation.
 *  - En cas de défaut d'un participant, l'adresse à l'origine du flux est remplacée par ce contrat de séquestre (Eskrow) abondé par le garant.
 *  - Si il n'y a pas de défaut, le garant est le seul à pouvoir récupérer ses sous du contrat.
 *
 */
contract Eskrow {
    constructor() {}

    receive() external payable {
        payable(msg.sender).transfer(msg.value);
    }

    fallback() external payable {
        payable(msg.sender).transfer(msg.value);
    }
}
