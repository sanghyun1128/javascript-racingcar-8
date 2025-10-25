import { MissionUtils } from '@woowacourse/mission-utils';

import Validator from '../utils/Validator.js';
import MESSAGES from '../consts/messages.js';
import DEFAULT_VALUES from '../consts/default_values.js';

class IOManager {
  static async getString() {
    const string = await MissionUtils.Console.readLineAsync('');
    Validator.validateString(string);

    return string.trim();
  }

  static async getNumber() {
    const number = await MissionUtils.Console.readLineAsync('');
    Validator.validateNumber(number);

    return Number(number.trim());
  }

  static printRequestNames() {
    MissionUtils.Console.print(MESSAGES.REQUEST_NAMES);
  }

  static printRequestNumOfRounds() {
    MissionUtils.Console.print(MESSAGES.REQUEST_NUM_OF_ROUNDS);
  }

  static printEmptyLine() {
    MissionUtils.Console.print('');
  }

  static printResultHeader() {
    MissionUtils.Console.print(MESSAGES.RESULT_HEADER);
  }

  static printWinner(nameArray) {
    MissionUtils.Console.print(
      `${MESSAGES.WINNER_PREFIX}${MESSAGES.SEPARATOR}${nameArray.join(`${DEFAULT_VALUES.DEFAULT_DELIMITER} `)}`,
    );
  }

  static printRoundResult(roundResult) {
    roundResult.forEach((e) => {
      MissionUtils.Console.print(
        `${e.name}${MESSAGES.SEPARATOR}${MESSAGES.PROGRESS_INDICATOR.repeat(e.position)}`,
      );
    });
  }

  static applyErrorMessageFormat(errorMessage) {
    return `${MESSAGES.ERROR_PREFIX}${MESSAGES.SEPARATOR}${errorMessage}`;
  }
}

export default IOManager;
