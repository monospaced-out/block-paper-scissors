import store from '../store'
import BlockPaperScissorsContract from '../../build/contracts/BlockPaperScissors.json'

const contract = require('truffle-contract')

const CONTRACT_ADDRESS = process.env.REACT_APP_BLOCK_PAPER_SCISSORS_CONTRACT

export default (playerAddress, opponentAddress, gameId, cb) => {
  let web3 = store.getState().web3.web3Instance
  let blockPaperScissors = contract(BlockPaperScissorsContract)
  blockPaperScissors.setProvider(web3.currentProvider)
  let deployed = CONTRACT_ADDRESS ? blockPaperScissors.at(CONTRACT_ADDRESS) : blockPaperScissors.deployed()
  deployed.then(function(blockPaperScissorsInstance) {
    blockPaperScissorsInstance.getChoice(opponentAddress, playerAddress, gameId, {from: playerAddress}).then(cb)
  })
}
