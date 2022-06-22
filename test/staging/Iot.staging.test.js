const { ethers, getNamedAccounts, network } = require("hardhat")
const { assert } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Iot", async function () {
          let deployer
          let iot
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              iot = await ethers.getContract("Iot", deployer)
          })
          it("allows people to read and update iot stats", async function () {
              await iot.updateIot("5", "5", "5")
              const { temperature, humidity, moisture } = await iot.readStats()
              assert.equal(temperature.toString(), "5")
              assert.equal(humidity.toString(), "5")
              assert.equal(moisture.toString(), "5")
          })
      })
