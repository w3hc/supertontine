import { task } from "hardhat/config";
var msg = (require("cli-color")).xterm(39).bgXterm(128)
import * as store from '../store.json'

task("send", "Send a given amount of tokens to a given address")
.addParam("wallet").addParam("amount").setAction(

    async (args) => {
        const [signer] = await ethers.getSigners()
        const USD = await ethers.getContractFactory('USD')
        const addr = store.USDContractAddress
        const erc20 = new ethers.Contract(addr, USD.interface, signer)
        const mint = await erc20.transfer(args.wallet, await ethers.parseEther(args.amount))
        const hash = mint.hash
        console.log("\nSent", msg(args.amount), "to", args.wallet , "\n\nTx hash:", msg(hash))
    }
);
