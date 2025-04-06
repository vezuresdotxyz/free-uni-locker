import { HardhatRuntimeEnvironment } from "hardhat/types";
import { waitForTx } from "../scripts/utils";
import { keccak256 } from "ethers/lib.commonjs/ethers";

import FreeUniV3LPLocker from "../artifacts/contracts/FreeUniV3LPLocker.sol/FreeUniV3LPLocker.json";

async function main(hre: HardhatRuntimeEnvironment) {
  const salt =
    "0x0000000000000000000000000000000000000000000000000000000000000000";

  const create2Deployer = await hre.ethers.getContractAt(
    "ICreate2Deployer",
    "0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2"
  );

  const estimated = await create2Deployer.computeAddress(
    salt,
    keccak256(FreeUniV3LPLocker.bytecode)
  );

  console.log("Estimated address", estimated);

  await waitForTx(
    await create2Deployer.deploy(0n, salt, FreeUniV3LPLocker.bytecode)
  );

  console.log("FreeUniV3LPLocker deployed to", estimated);
}

main.tags = ["DeployLocker"];
export default main;
