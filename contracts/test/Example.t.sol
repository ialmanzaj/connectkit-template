// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 } from "forge-std/src/console2.sol";
import { StdCheats } from "forge-std/src/StdCheats.sol";

import { Example } from "../src/Example.sol";

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract ExampleTest is PRBTest, StdCheats {
    ExamplePool internal pool;

    function setUp() public virtual {
        pool = new ExamplePool();
    }

    function testDeposit(uint256 x) external { }

    function testTakeLoan() external { }

    function testRepayLoan() external { }
}
