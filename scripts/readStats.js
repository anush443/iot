const { getNamedAccounts, ethers, deployments } = require("hardhat")

const main = async () => {
    const { deployer } = await getNamedAccounts()

    const iot = await ethers.getContract("Iot", deployer)
    const { temperature, humidity, moisture } = await iot.readStats()
    console.log(
        `Temperature : ${temperature.toString()}       Humidity :${humidity.toString()}       Moisture :${moisture.toString()}`
    )
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
