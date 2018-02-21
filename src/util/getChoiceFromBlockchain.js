import store from '../store'
import BlockPaperScissorsContract from '../../build/contracts/BlockPaperScissors.json'

const contract = require('truffle-contract')

const CONTRACT_ADDRESS = process.env.REACT_APP_BLOCK_PAPER_SCISSORS_CONTRACT

export default (playerAddress, opponentAddress, gameId) => {
  let web3 = store.getState().web3.web3Instance
  let blockPaperScissors = contract(BlockPaperScissorsContract)
  blockPaperScissors.setProvider(web3.currentProvider)
  let deployed = CONTRACT_ADDRESS ? blockPaperScissors.at(CONTRACT_ADDRESS) : blockPaperScissors.deployed()
  return deployed.then(function(blockPaperScissorsInstance) {
    return blockPaperScissorsInstance.getChoice(playerAddress, opponentAddress, gameId, {from: playerAddress})
  })
}
