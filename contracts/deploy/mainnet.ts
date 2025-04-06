import { HardhatRuntimeEnvironment } from "hardhat/types";
import { verify, waitForTx } from "../scripts/utils";

import FreeUniV3LPLocker from "../artifacts/contracts/FreeUniV3LPLocker.sol/FreeUniV3LPLocker.json";

async function main(hre: HardhatRuntimeEnvironment) {
  const salt =
    "0x6e07107a60abe8c628b44ebd65fbfedf0d602d9cdf8408d570f31bc51c8ba3f6";

  const create2Deployer = await hre.ethers.getContractAt(
    "ICreate2Deployer",
    "0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2"
  );

  const estimated = await create2Deployer.computeAddress(
    salt,
    hre.ethers.keccak256(FreeUniV3LPLocker.bytecode)
  );

  console.log("Estimated address", estimated);

  // wait for 5 confirmations
  await waitForTx(
    await create2Deployer.deploy(0n, salt, FreeUniV3LPLocker.bytecode),
    5
  );

  await verify(hre, estimated, []);
  await hre.deployments.save("FreeUniV3LPLocker", {
    address: estimated,
    abi: FreeUniV3LPLocker.abi,
    args: [],
  });

  console.log("FreeUniV3LPLocker deployed to", estimated);
}

main.tags = ["DeployLocker"];
export default main;
