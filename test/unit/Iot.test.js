const { deployments, ethers, getNamedAccounts, network } = require("hardhat")
const { assert, expect } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name) &&
    describe("Iot", async function () {
        let deployer
        let iot
        let mockV3Aggregator
        beforeEach(async function () {
            deployer = (await getNamedAccounts()).deployer
            await deployments.fixture(["all"])
            iot = await ethers.getContract("Iot", deployer)
            mockV3Aggregator = await ethers.getContract(
                "MockV3Aggregator",
                deployer
            )
        })

        describe("constructor", async function () {
            it("sets the aggregator addresses correctly", async function () {
                const response = await iot.priceFeed()
                assert.equal(response, mockV3Aggregator.address)
            })
        })

        describe("updateIot", async function () {
            it("intial temp,humidity,moisture should be 0", async function () {
                const { temperature, humidity, moisture } =
                    await iot.readStats()
                assert.equal(temperature.toString(), "0")
                assert.equal(humidity.toString(), "0")
                assert.equal(moisture.toString(), "0")
            })

            it("should update correctly", async function () {
                const newTemp = "16"
                const newHumidity = "55"
                const newMoisture = "12"
                const transcationResponse = await iot.updateIot(
                    newTemp,
                    newHumidity,
                    newMoisture
                )
                const transcationReceipt = await transcationResponse.wait(1)
                const { temperature, humidity, moisture } =
                    await iot.readStats()
                assert.equal(temperature.toString(), newTemp)
                assert.equal(humidity.toString(), newHumidity)
                assert.equal(moisture.toString(), newMoisture)
            })

            it("should allow only owner to update", async function () {
                const accounts = await ethers.getSigners()
                const attacker = accounts[1]
                const attackerConnectedContract = await iot.connect(attacker)

                expect(
                    attackerConnectedContract.updateIot("5", "5", "5")
                ).to.be.revertedWith("Iot__NotOwner")
            })
        })
    })
