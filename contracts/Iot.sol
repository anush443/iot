// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./EthInUsd.sol";

error Iot__NotOwner();

contract Iot {
    address public immutable i_owner;

    AggregatorV3Interface public priceFeed;

    struct stats {
        int256 temperature;
        int256 humidity;
        int256 moisture;
    }

    stats iotReading;

    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert Iot__NotOwner();
        }
        _;
    }

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function updateIot(
        int256 _temperature,
        int256 _humidity,
        int256 _moisture
    ) public onlyOwner {
        iotReading = stats(_temperature, _humidity, _moisture);
    }

    function readStats() public view returns (stats memory) {
        return iotReading;
    }

    function getUsd() public view returns (uint256) {
        return EthInUsd.getCurrentPrice(priceFeed);
    }
}
