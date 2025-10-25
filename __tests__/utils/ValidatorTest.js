import Validator from '../../src/utils/Validator.js';
import ERROR_MESSAGES from '../../src/consts/error_messages.js';
import LIMIT_VALUES from '../../src/consts/limit_values.js';

describe('문자열 검증 로직 테스트', () => {
  test.each([['a'], ['ㅁ'], ['as,asd,asdf,ㅁㄴ,ㅁㄴㅇ'], ['  a,b,c      ']])(
    '허용되는 입력',
    (input) => {
      expect(() => Validator.validateString(input)).not.toThrow();
    },
  );

  test.each([
    ['', ERROR_MESSAGES.EMPTY_INPUT],
    [' ', ERROR_MESSAGES.EMPTY_INPUT],
    ['      ', ERROR_MESSAGES.EMPTY_INPUT],
    [`${'a'.repeat(LIMIT_VALUES.MAX_INPUT_LENGTH + 1)}`, ERROR_MESSAGES.LONG_INPUT],
  ])('적절하지 않은 길이의 문자열 입력시 에러 발생', (input, errorMessage) => {
    expect(() => Validator.validateString(input)).toThrow(errorMessage);
  });

  test.each([[`${'a'.repeat(LIMIT_VALUES.MAX_INPUT_LENGTH)}`]])(
    '문자열 길이 경계값 입력시 정상 처리',
    (input) => {
      expect(() => Validator.validateString(input)).not.toThrow();
    },
  );
});

describe('숫자 검증 로직 테스트', () => {
  test.each([['0'], ['1'], ['-1'], ['234234'], ['0.123']])('허용되는 입력', (input) => {
    expect(() => Validator.validateNumber(input)).not.toThrow();
  });

  test.each([['asdfasdf'], ['112as']])('문자 입력시 에러 발생', (input) => {
    expect(() => Validator.validateNumber(input)).toThrow(ERROR_MESSAGES.NOT_NUMBER);
  });

  test.each([[`${LIMIT_VALUES.MAX_SAFE_INTEGER}`]])('너무 큰 숫자 입력시 에러 발생', (input) => {
    expect(() => Validator.validateNumber(input)).toThrow(ERROR_MESSAGES.BIG_NUMBER);
  });

  test.each([[`${LIMIT_VALUES.MAX_SAFE_INTEGER - 1}`]])(
    '큰 숫자 경계값 입력시 정상 처리',
    (input) => {
      expect(() => Validator.validateNumber(input)).not.toThrow();
    },
  );
});

describe('중복 검사 로직 테스트', () => {
  test('중복 없을 경우', () => {
    const input = ['1', '2', '3'];

    expect(() => Validator.validateNoDuplicates(input)).not.toThrow();
  });

  test('중복 있을 경우 에러 발생', () => {
    const input = ['1', '2', '2'];

    expect(() => Validator.validateNoDuplicates(input)).toThrow(ERROR_MESSAGES.DUPLICATE_NAME);
  });
});

describe('이름 형식 검증 로직 테스트', () => {
  test.each([['asdfg'], ['asd 1'], ['가ㄴㄷ'], ['1234']])('허용되는 입력', (input) => {
    expect(() => Validator.validateName(input)).not.toThrow();
  });

  test.each([['asdf*'], ['!'], ['@'], ['\\']])(
    '영어, 한글, 숫자, 공백 이외의 문자 입력시 에러 발생',
    (input) => {
      expect(() => Validator.validateName(input)).toThrow(ERROR_MESSAGES.NOT_ALLOWED_CHARACTER);
    },
  );

  test.each([['']])('공백 입력시 에러 발생', (input) => {
    expect(() => Validator.validateName(input)).toThrow(ERROR_MESSAGES.EMPTY_NAME);
  });

  test.each([[`${'a'.repeat(LIMIT_VALUES.MAX_NAME_LENGTH + 1)}`]])(
    '허용 길이를 초과 할 때 에러 발생',
    (input) => {
      expect(() => Validator.validateName(input)).toThrow(ERROR_MESSAGES.LONG_NAME);
    },
  );

  test.each([[`${'a'.repeat(LIMIT_VALUES.MAX_NAME_LENGTH)}`]])(
    '허용 길이 경계값 입력시 정상 처리',
    (input) => {
      expect(() => Validator.validateName(input)).not.toThrow();
    },
  );
});

describe('참가자 수 검증 로직 테스트', () => {
  test.each([[6], [14], [23]])('허용되는 입력', (input) => {
    expect(() => Validator.validateNumOfParticipants(input)).not.toThrow();
  });

  test.each([
    [LIMIT_VALUES.MIN_PARTICIPANTS - 1, ERROR_MESSAGES.MIN_PARTICIPANTS],
    [LIMIT_VALUES.MAX_PARTICIPANTS + 1, ERROR_MESSAGES.MAX_PARTICIPANTS],
  ])('허용되지 않는 수의 참가자 입력시 에러 발생', (input, errorMessage) => {
    expect(() => Validator.validateNumOfParticipants(input)).toThrow(errorMessage);
  });

  test.each([[LIMIT_VALUES.MIN_PARTICIPANTS, LIMIT_VALUES.MAX_PARTICIPANTS]])(
    '참가자 수 경계값 입력시 정상 처리',
    (input) => {
      expect(() => Validator.validateNumOfParticipants(input)).not.toThrow();
    },
  );
});

describe('라운드 수 입력 검증 로직 테스트', () => {
  test.each([[6], [46], [63]])('허용되는 입력', (input) => {
    expect(() => Validator.validateNumOfRounds(input)).not.toThrow();
  });

  test.each([
    [LIMIT_VALUES.MIN_ROUNDS - 1, ERROR_MESSAGES.MIN_ROUNDS],
    [LIMIT_VALUES.MAX_ROUNDS + 1, ERROR_MESSAGES.MAX_ROUNDS],
  ])('허용되지 않는 수의 라운드 수 입력시 에러 발생', (input, errorMessage) => {
    expect(() => Validator.validateNumOfRounds(input)).toThrow(errorMessage);
  });

  test.each([[LIMIT_VALUES.MIN_ROUNDS, LIMIT_VALUES.MAX_ROUNDS]])(
    '라운드 수 경계값 입력시 정상 처리',
    (input) => {
      expect(() => Validator.validateNumOfRounds(input)).not.toThrow();
    },
  );
});
