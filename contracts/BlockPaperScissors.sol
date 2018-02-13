pragma solidity ^0.4.2;

contract BlockPaperScissors {
  struct Play {
    address opponent;
    string choice;
    bool isSet;
  }

  mapping(address => mapping(string => Play)) private records;

  function createPlay(address opponent, string choice, string gameId) public {
    if (records[msg.sender][gameId].isSet) return;
    records[msg.sender][gameId] = Play({opponent: opponent, choice: choice, isSet: true});
  }

  function getChoice(address player, address opponent, string gameId) public view returns (string) {
    if (records[player][gameId].opponent != opponent) return "";
    return records[player][gameId].choice;
  }
}
