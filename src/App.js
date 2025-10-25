import IOManager from './io/IOManager.js';
import RaceManager from './domain/RaceManager.js';
import StringUtil from './utils/StringUtil.js';
import Validator from './utils/Validator.js';

class App {
  async run() {
    try {
      // 1. 입력 받기
      IOManager.printRequestNames();
      const names = await IOManager.getString();
      IOManager.printRequestNumOfRounds();
      const numOfRounds = await IOManager.getNumber();

      // 2. 입력 가공
      const nameArray = StringUtil.splitByDefaultDelimiter(names);
      Validator.validateNoDuplicates(nameArray);
      Validator.validateNumOfParticipants(nameArray.length);

      // 3. 레이스 진행
      const raceManager = new RaceManager(numOfRounds);
      nameArray.forEach((e) => raceManager.addParticipant(e));
      raceManager.startRace();

      // 4. 결과 표시
      IOManager.printEmptyLine();
      IOManager.printResultHeader();
      raceManager.getRoundResults().forEach((e) => {
        IOManager.printRoundResult(e);
        IOManager.printEmptyLine();
      });
      IOManager.printWinner(raceManager.retrieveWinners());
    } catch (error) {
      error.message = IOManager.applyErrorMessageFormat(error.message);
      throw error;
    }
  }
}

export default App;
