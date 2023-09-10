const color = require("cli-color")
var msg = color.xterm(39).bgXterm(128)
import hre, { ethers, network } from 'hardhat'
import fs from 'fs'
import * as tontine from '../tontine.config'

async function main() {

  console.log("Duration:", tontine.roundDuration)
  console.log("First members:", tontine.firstMembers)
  console.log("Amount:", tontine.monthlyContribAmount)

  // deploy
  const initialMint = ethers.parseEther("10000")
  const USD = await ethers.getContractFactory("USD")
  const usd = await USD.deploy(initialMint)

  const recordAddress = {
    "contractAddress": await usd.getAddress()
  }
  
  // write the contract address in store.json
  const content = JSON.stringify(recordAddress, null, 2)
  fs.writeFileSync('store.json', content)

  console.log('\nUSD contract deployed:', msg(await usd.getAddress()))

  /*
  *
  * Uncomment the part below to activate the Etherscan verification.
  * 
  */
  // try {
  //   console.log("\nEtherscan verification in progress...")
  //   console.log("\nWaiting for 6 block confirmations (you can skip this part)")
  //   await usd.deploymentTransaction()?.wait(6)
  //   await hre.run("verify:verify", { network: network.name, address: await usd.getAddress(), constructorArguments: [initialMint], })
  //   console.log("Etherscan verification done. ✅")
  // } catch (error) {
  //   console.error(error)
  // }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});