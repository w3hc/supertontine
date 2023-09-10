const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Super Tontine", function () {
  
  describe("USD", function () {

    async function deployContracts() {
      const [alice, bob] = await ethers.getSigners();
      const initialBalance = ethers.parseEther('10000')
      const USD = await ethers.getContractFactory("USD")
      const usd = await USD.deploy(initialBalance)
      return { usd, alice, bob, initialBalance }
    }

    describe("Deployment", function () {
      it("Should return a balance of 10,000 units", async function () {
        const { usd, initialBalance, alice } = await loadFixture(deployContracts);
        expect(await usd.balanceOf(alice.address)).to.equal(initialBalance)
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
    })
  })
  describe("Tontine Logic", function () {

    async function deployContracts() {
      const [alice, bob] = await ethers.getSigners();

      const initialBalance = ethers.parseEther('10000')
      const USD = await ethers.getContractFactory("USD")
      const usd = await USD.deploy(initialBalance)

      // TODO: deploy DAO + NFT

      // TODO: deploy TontineLogic
      // uint256 _roundDuration, uint256 _monthlyContribAmount, ISuperToken _acceptedToken, ISuperfluid _host, address _owner, address _membershipNFTAddress
      const TontineLogic = await ethers.getContractFactory("TontineLogic")
      const tontine = await TontineLogic.deploy()

      return { usd, alice, bob, initialBalance }
    }

    describe("Deployment", function () {
      xit("Should return the targeted participant", async function () {
        const { usd, initialBalance, alice } = await loadFixture(deployContracts);
        expect(await usd.balanceOf(alice.address)).to.equal(initialBalance)
      })
    })

    describe("Interactions", function () {
      xit("Should detect a payment default", async function () {

      });
      xit("Should switch to next target", async function () {

      });
    })
  })
  describe("Eskrow", function () {

    async function deployContracts() {
      const [alice, bob] = await ethers.getSigners();
      const initialBalance = ethers.parseEther('10000')
      const USD = await ethers.getContractFactory("USD")
      const usd = await USD.deploy(initialBalance)
      return { usd, alice, bob, initialBalance }
    }

    describe("Deployment", function () {
      xit("Should return the address of the eskrow funder", async function () {
      })
      xit("Should return the address of the beneficiary", async function () {
      })
    })

    describe("Interactions", function () {
      xit("Should be correctly connected with TontineLogic", async function () {

      });
    })
  })
  describe("Gov", function () {

    async function deployContracts() {
      const [alice, bob] = await ethers.getSigners();
      const initialBalance = ethers.parseEther('10000')
      const USD = await ethers.getContractFactory("USD")
      const usd = await USD.deploy(initialBalance)
      return { usd, alice, bob, initialBalance }
    }

    describe("Deployment", function () {
      xit("Should return the right owner", async function () {
      })
    })

    describe("Interactions", function () {
      xit("Should accept a new member", async function () {

      });
    })
  })
  describe("Membership NFT", function () {

    async function deployContracts() {
      const [alice, bob] = await ethers.getSigners();
      const initialBalance = ethers.parseEther('10000')
      const USD = await ethers.getContractFactory("USD")
      const usd = await USD.deploy(initialBalance)
      return { usd, alice, bob, initialBalance }
    }

    describe("Deployment", function () {
      xit("Should return the address of the holder of ID 0", async function () {
      })
    })

    describe("Interactions", function () {
      xit("Should not be transferred (SBT)", async function () {

      });
    })
  })
})