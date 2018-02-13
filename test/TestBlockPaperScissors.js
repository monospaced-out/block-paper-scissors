/* globals assert, artifacts, contract, web3 */

let BlockPaperScissors = artifacts.require("./BlockPaperScissors.sol");
let blockPaperScissorsInstance;

contract('BlockPaperScissors', function(accounts) {

  it("...should create a play and prevent editing.", function() {
    return BlockPaperScissors.deployed().then(function(instance) {
      blockPaperScissorsInstance = instance;

      return blockPaperScissorsInstance.createPlay(accounts[1], 'rock', '1234');
    }).then(function() {
      return blockPaperScissorsInstance.createPlay(accounts[1], 'paper', '1234');
    }).then(function() {
      return blockPaperScissorsInstance.getChoice(accounts[0], accounts[1], '1234');
    }).then(function(choice) {
      assert.equal(choice, 'rock', "The play was created.");
    });
  });

});
