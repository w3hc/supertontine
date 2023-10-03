import { task } from "hardhat/config"
var msg = (require("cli-color")).xterm(39).bgXterm(128)
import * as store from '../store.json'

task("mint", "Mint a given amount of ERC-20 tokens")
.addParam("amount").setAction(

    async (amount) => {
        const [signer] = await ethers.getSigners()
        const USD = await ethers.getContractFactory('USD')
        const addr = store.USDContractAddress
        const erc20 = new ethers.Contract(addr, USD.interface, signer)
        const mint = await erc20.mint(await ethers.parseEther(amount.amount))
        const hash = mint.hash
        console.log("Minted", msg(amount.amount), "units. \n\nTx hash:", msg(hash))
    }
);