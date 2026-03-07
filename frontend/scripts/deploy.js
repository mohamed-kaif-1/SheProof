const hre = require("hardhat");

async function main() {

  const SheProof = await hre.ethers.getContractFactory("SheProof");

  const sheProof = await SheProof.deploy();

  await sheProof.waitForDeployment();

  console.log("DEPLOYED TO:", await sheProof.getAddress());

}

main().catch(console.error);