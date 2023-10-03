const color = require("cli-color")
var msg = color.xterm(39).bgXterm(128)
import hre, { ethers, network } from 'hardhat'
import fs from 'fs'
import * as tontineConfig from '../tontine.config'

async function main() {

  console.log("Duration:", tontineConfig.roundDuration)
  console.log("First members:", tontineConfig.firstMembers)
  console.log("Amount:", tontineConfig.monthlyContribAmount)

  const initialBalance = ethers.parseEther('10000')
    const USD = await ethers.getContractFactory("USD")
    const usd = await USD.deploy(initialBalance)
    console.log('\nUSD contract deployed:', msg(await usd.getAddress()))

    const firstMembers = [
      "0xD8a394e7d7894bDF2C57139fF17e5CBAa29Dd977", // Alice
      "0xe61A1a5278290B6520f0CEf3F2c71Ba70CF5cf4C" // Bob
    ];      
    const uri = "ipfs://bafkreih2ac5yabo2daerkw5w5wcwdc7rveqejf4l645hx2px26r5fxfnpe"
    const nftName = "Membership NFT"
    const symbol = "MEMBER"
    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(firstMembers, uri, nftName, symbol)
    console.log('\nMembership NFT contract deployed:', msg(await nft.getAddress()))

    const manifesto = "bafybeihprzyvilohv6zwyqiel7wt3dncpjqdsc6q7xfj3iuraoc7n552ya"
    const name = "Gov"
    const votingDelay = 1 // 1 second
    const votingPeriod = 60 * 60 * 24 * 15 // 15 days
    const votingThreshold = 1 
    const quorum = 20 // 20%
    const Gov = await ethers.getContractFactory("Gov")
    const gov = await Gov.deploy(
      await nft.getAddress(), 
      manifesto, 
      name, 
      votingDelay, 
      votingPeriod, 
      votingThreshold, 
      quorum
    )
    console.log('\nGov contract deployed:', msg(await gov.getAddress()))

    await nft.transferOwnership(await gov.getAddress())
    console.log('\nNFT contract ownership transfered to Gov. ✅')

    // TODO: deploy TontineLogic
    // uint256 _roundDuration, uint256 _monthlyContribAmount, ISuperToken _acceptedToken, ISuperfluid _host, address _owner, address _membershipNFTAddress
    // const TontineLogic = await ethers.getContractFactory("TontineLogic")
    // const tontine = await TontineLogic.deploy()
    const tontine = "0xblablablah"

    const recordAddresses = {
      "USDContractAddress": await usd.getAddress(),
      "NFTContractAddress": await nft.getAddress(),
      "GovContractAddress": await gov.getAddress(),
      // "TontineLogic contract address": await tontine.getAddress(),
    }
    
    const content = JSON.stringify(recordAddresses, null, 2)
    fs.writeFileSync('store.json', content)

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