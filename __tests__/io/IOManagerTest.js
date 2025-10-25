import { MissionUtils } from '@woowacourse/mission-utils';

import IOManager from '../../src/io/IOManager.js';
import MESSAGES from '../../src/consts/messages.js';
import DEFAULT_VALUES from '../../src/consts/default_values.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('Input 테스트', () => {
  test.each([
    ['as,df', 'as,df'],
    [' as,df ', 'as,df'],
    [' a d, f', 'a d, f'],
  ])('허용 되는 문자열 입력', async (input, output) => {
    mockQuestions([input]);

    await expect(IOManager.getString()).resolves.toBe(output);
  });

  test.each([
    ['123', 123],
    ['-123', -123],
    ['0.123', 0.123],
  ])('허용 되는 숫자 입력', async (input, output) => {
    mockQuestions([input]);

    await expect(IOManager.getNumber()).resolves.toBe(output);
  });
});

describe('Output 테스트', () => {
  test('이름 목록 요청 출력', () => {
    const output = `${MESSAGES.REQUEST_NAMES}`;

    const logSpy = getLogSpy();
    IOManager.printRequestNames();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
  });

  test('라운드 수 요청 출력', () => {
    const output = `${MESSAGES.REQUEST_NUM_OF_ROUNDS}`;

    const logSpy = getLogSpy();
    IOManager.printRequestNumOfRounds();

    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(output));
  });

  test('빈 줄 출력', () => {
    const logSpy = getLogSpy();
    IOManager.printEmptyLine();

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/^\s*$/));
  });

  test('결과 헤더 출력', () => {
    const output = `${MESSAGES.RESULT_HEADER}`;

    const logSpy = getLogSpy();
    IOManager.printResultHeader();

    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(output));
  });

  test('라운드 결과 출력', () => {
    const inputs = [
      { name: 'a', position: 2 },
      { name: 'b', position: 1 },
    ];
    const outputs = ['a : --', 'b : -'];

    const logSpy = getLogSpy();
    IOManager.printRoundResult(inputs);

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('여러 우승자 출력', () => {
    const inputs = ['a', 'b'];
    const output = `${MESSAGES.WINNER_PREFIX}${MESSAGES.SEPARATOR}a${DEFAULT_VALUES.DEFAULT_DELIMITER} b`;

    const logSpy = getLogSpy();
    IOManager.printWinner(inputs);

    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(output));
  });

  test('단일 우승자 출력', () => {
    const inputs = ['a'];
    const output = `${MESSAGES.WINNER_PREFIX}${MESSAGES.SEPARATOR}a`;

    const logSpy = getLogSpy();
    IOManager.printWinner(inputs);

    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(output));
  });
});

describe('Error 테스트', () => {
  test('에러 메시지 설정', () => {
    const errorMessage = 'asdf';
    const error = new Error(errorMessage);
    const output = `${MESSAGES.ERROR_PREFIX}${MESSAGES.SEPARATOR}${errorMessage}`;

    IOManager.setErrorMessageFormat(error);

    expect(error.message).toBe(output);
  });
});
