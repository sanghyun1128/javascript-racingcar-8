import ERROR_MESSAGES from '../consts/error_messages.js';
import LIMIT_VALUES from '../consts/limit_values.js';

class Validator {
  static validateString(string) {
    const trimmedString = string.trim();
    const stringLength = trimmedString.length;

    if (stringLength === 0) throw new Error(ERROR_MESSAGES.EMPTY_INPUT);
    if (stringLength > LIMIT_VALUES.MAX_INPUT_LENGTH) throw new Error(ERROR_MESSAGES.LONG_INPUT);
  }

  static validateNumber(number) {
    const trimmedNumber = number.trim();

    if (Number.isNaN(+trimmedNumber)) throw new Error(ERROR_MESSAGES.NOT_NUMBER);
    if (+trimmedNumber >= LIMIT_VALUES.MAX_SAFE_INTEGER) throw new Error(ERROR_MESSAGES.BIG_NUMBER);
  }

  static validateName(name) {
    const trimmedName = name.trim();

    if (trimmedName.length > LIMIT_VALUES.MAX_NAME_LENGTH)
      throw new Error(ERROR_MESSAGES.LONG_NAME);

    const invalidCharRegex = /[^A-Za-z0-9\uAC00-\uD7A3\s]/;
    if (invalidCharRegex.test(trimmedName)) throw new Error(ERROR_MESSAGES.NOT_ALLOWED_CHARACTER);
  }

  static validateNumOfParticipants(numOfParticipants) {
    if (numOfParticipants > LIMIT_VALUES.MAX_PARTICIPANTS)
      throw new Error(ERROR_MESSAGES.MAX_PARTICIPANTS);
    if (numOfParticipants < LIMIT_VALUES.MIN_PARTICIPANTS)
      throw new Error(ERROR_MESSAGES.MIN_PARTICIPANTS);
  }

  static validateNumOfRounds(numOfRounds) {
    if (numOfRounds > LIMIT_VALUES.MAX_ROUNDS) throw new Error(ERROR_MESSAGES.MAX_ROUNDS);
    if (numOfRounds < LIMIT_VALUES.MIN_ROUNDS) throw new Error(ERROR_MESSAGES.MIN_ROUNDS);
  }
}

export default Validator;
