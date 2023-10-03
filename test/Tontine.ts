import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
const { Framework } = require("@superfluid-finance/sdk-core")
const { ethers } = require("hardhat")
import { deployTestFramework } from "@superfluid-finance/ethereum-contracts/dev-scripts/deploy-test-framework"
const TestToken = require("@superfluid-finance/ethereum-contracts/build/contracts/TestToken.json")

describe("Super Tontine", function () {
  
    async function deployContracts() {

      let [alice, bob, francis] = await ethers.getSigners()

      const accounts = await ethers.getSigners()
      const provider = alice
      // const sfDeployer = await deployTestFramework()

      const initialBalance = ethers.parseEther('10000')
      const USD = await ethers.getContractFactory("USD")
      const usd = await USD.deploy(initialBalance)

      const firstMembers:any = [alice.address, bob.address, francis.address]
      const uri = "ipfs://bafkreih2ac5yabo2daerkw5w5wcwdc7rveqejf4l645hx2px26r5fxfnpe"
      const nftName = "Membership NFT"
      const symbol = "MEMBER"
      const NFT = await ethers.getContractFactory("NFT")
      const nft = await NFT.deploy(firstMembers, uri, nftName, symbol)

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
      await nft.transferOwnership(await gov.getAddress())

      await nft.connect(alice).delegate(alice.address)
      await nft.connect(bob).delegate(bob.address)

      const roundDuration = 60 * 60 * 24 * 30 // 30 days
      const monthlyContribAmount = 200
      const acceptedToken = await usd.getAddress()
      const host = alice.address
      const owner = alice.address
      const membershipNFTAddress = await nft.getAddress()

      // check https://github.com/superfluid-finance/super-examples/blob/main/projects/tradeable-cashflow/test/TradeableCashflow.test.js
      const TontineLogic = await ethers.getContractFactory("TontineLogic")
      // const tontine = await TontineLogic.deploy(roundDuration, monthlyContribAmount, acceptedToken, host, owner, membershipNFTAddress) // uint256 _roundDuration, uint256 _monthlyContribAmount, ISuperToken _acceptedToken, ISuperfluid _host, address _owner, address _membershipNFTAddress

      return { usd, alice, bob, initialBalance, nft, uri, gov, manifesto}
    }

    describe("Deployment", function () {
      it.only("Should return a balance of 10,000 units", async function () {
        const { usd, initialBalance, alice } = await loadFixture(deployContracts);
        expect(await usd.balanceOf(alice.address)).to.equal(initialBalance)
      })
      it("Should the URI of the NFT", async function () {
        const { nft, uri } = await loadFixture(deployContracts);
        expect(await nft.tokenURI(1)).to.equal(uri)
      })
      it("Should set the right manifesto cid", async function () {
        const { gov } = await loadFixture(deployContracts);
        expect(await gov.manifesto()).to.equal("bafybeihprzyvilohv6zwyqiel7wt3dncpjqdsc6q7xfj3iuraoc7n552ya");
      })
    })

    describe("Interactions", function () {
      it("Should mint 1 unit", async function () {
        const { usd, alice } = await loadFixture(deployContracts);
        const amount = ethers.parseEther('1')
        await usd.mint(amount)
        expect(await usd.balanceOf(alice.address)).to.be.equal(ethers.parseEther('10001'))
      });
      it("Should transfer 1 unit", async function () {
        const { usd, bob } = await loadFixture(deployContracts);
        const amount = ethers.parseEther('1')
        await usd.transfer(bob.address, amount)
        expect(await usd.balanceOf(bob.address)).to.be.equal(ethers.parseEther('1'))
      })
      it("Should not transfer the NFT", async function () {
        const { nft, alice, bob } = await loadFixture(deployContracts);
        await expect( nft.transferFrom(alice.address, bob.address, 0)).to.be.revertedWith("Token not transferable")
      })
      xit("Should detect a payment default", async function () {
      });

      xit("Should switch to next target", async function () {
      });

      xit("Should return the address of the escrow funder", async function () {
      })

      xit("Should return the address of the beneficiary", async function () {
      })

      xit("Should be correctly connected with TontineLogic", async function () {
      });
    })
})