var BlockPaperScissors = artifacts.require("./BlockPaperScissors.sol");

module.exports = function(deployer) {
  deployer.deploy(BlockPaperScissors);
};
