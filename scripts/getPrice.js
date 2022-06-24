const { getNamedAccounts, ethers } = require("hardhat")

const main = async () => {
    const { deployer } = await getNamedAccounts()
    const iot = await ethers.getContract("Iot", deployer)
    const ethInUsd = await iot.getUsd()
    console.log(`Current Price of Eth in Usd: $${ethInUsd / 100000000}`)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
