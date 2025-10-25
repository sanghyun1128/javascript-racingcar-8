import Validator from '../utils/Validator.js';
import Car from './Car.js';

class RaceManager {
  constructor(numOfRounds) {
    Validator.validateNumOfRounds(numOfRounds);
    this.numOfRounds = numOfRounds;
    this.roundResults = [];
    this.participants = [];
  }

  getNumOfRounds() {
    return this.numOfRounds;
  }

  addParticipant(name) {
    const car = new Car(name);
    this.participants.push(car);
  }

  getParticipants() {
    return this.participants;
  }

  startRace() {
    for (let i = 0; i < this.numOfRounds; i += 1) {
      this.runRound();
      const roundResult = this.getCurrentPositions();
      this.addRoundResult(roundResult);
    }
  }

  runRound() {
    this.participants.forEach((e) => e.moveForward());
  }

  getCurrentPositions() {
    const positions = [];

    this.participants.forEach((e) => {
      const positionInfo = {
        name: e.getName(),
        position: e.getPosition(),
      };
      positions.push(positionInfo);
    });

    return positions;
  }

  addRoundResult(roundResult) {
    this.roundResults.push(roundResult);
  }

  getRoundResults() {
    return this.roundResults;
  }

  retrieveWinners() {
    const winners = [];
    const finalResult = this.roundResults[this.roundResults.length - 1];

    finalResult.sort((a, b) => b.position - a.position);

    const winPosition = finalResult[0].position;
    finalResult.forEach((e) => {
      if (e.position === winPosition) winners.push(e.name);
    });

    return winners;
  }
}

export default RaceManager;
