import LIMIT_VALUES from './limit_values.js';

const ERROR_MESSAGES = {
  EMPTY_INPUT: '입력값이 비었습니다.',
  LONG_INPUT: '입력값이 너무 깁니다.',
  NOT_NUMBER: '숫자를 입력해야 합니다.',
  BIG_NUMBER: '입력된 숫자가 너무 큽니다.',
  LONG_NAME: `이름은 ${LIMIT_VALUES.MAX_NAME_LENGTH}자를 넘으면 안됩니다.`,
  NOT_ALLOWED_CHARACTER: '영어, 한글, 숫자, 공백 이외의 문자를 이름으로 설정할 수 없습니다.',
  DUPLICATE_NAME: '겹치는 이름이 있습니다.',
  EMPTY_NAME: '빈 이름이 있습니다.',
  MIN_PARTICIPANTS: `참가자는 ${LIMIT_VALUES.MIN_PARTICIPANTS}명 이상 이어야 합니다.`,
  MAX_PARTICIPANTS: `참가자는 ${LIMIT_VALUES.MIN_PARTICIPANTS}명을 넘으면 안됩니다.`,
  MIN_ROUNDS: `라운드의 수는 ${LIMIT_VALUES.MIN_ROUNDS} 이상 이어야 합니다.`,
  MAX_ROUNDS: `라운드의 수는 ${LIMIT_VALUES.MAX_ROUNDS}을 넘으면 안됩니다.`,
  UNKNOWN: '알 수 없는 에러가 발생했습니다.',
};

export default ERROR_MESSAGES;
