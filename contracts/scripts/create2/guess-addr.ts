import { ethers } from "ethers";
import { getCreate2Address } from "./create2";

export const guessAddress = (
  factoryAddress: string,
  contractBytecode: string
) => {
  let i = 0;

  while (true) {
    const salt = ethers.id("" + i + Date.now());

    // Calculate contract address
    const computedAddress = getCreate2Address({
      salt,
      factoryAddress,
      contractBytecode,
    });

    if (computedAddress.startsWith("0x0000")) {
      console.log("found the right salt hash");
      console.log("salt", salt, computedAddress);
      return { salt, computedAddress };
    }

    if (i % 100000 == 0) console.log(i, "salt", salt, computedAddress);
    i++;
  }
};

import FreeUniV3LPLocker from "../../artifacts/contracts/FreeUniV3LPLocker.sol/FreeUniV3LPLocker.json";
guessAddress(
  "0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2",
  FreeUniV3LPLocker.bytecode
);
