const { getNamedAccounts, ethers } = require("hardhat")

const main = async (temperature, humidity, moisture) => {
    const { deployer } = await getNamedAccounts()

    const iot = await ethers.getContract("Iot", deployer)

    console.log("Updating Stats.......")
    const transcationResponse = await iot.updateIot(
        temperature,
        humidity,
        moisture
    )
    await transcationResponse.wait(1)
    console.log("\n\nUpdated..........")
}

main(17, 40, -9)
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
