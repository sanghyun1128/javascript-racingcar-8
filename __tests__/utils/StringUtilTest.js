import StringUtil from '../../src/utils/StringUtil.js';
import DEFAULT_VALUES from '../../src/consts/default_values.js';

const D = DEFAULT_VALUES.DEFAULT_DELIMITER;

describe('splitByDefaultDelimiter 테스트', () => {
  test.each([
    [`aa a${D}sss${D}ddd`, ['aa a', 'sss', 'ddd']],
    [`aaa${D}${D}bbb`, ['aaa', '', 'bbb']],
    [`aaa${D}`, ['aaa', '']],
  ])('기본 동작', (input, output) => {
    expect(StringUtil.splitByDefaultDelimiter(input)).toEqual(output);
  });

  test.each([
    [` a aa   ${D}  sss ${D} ddd`, ['a aa', 'sss', 'ddd']],
    [`aaa${D}  ${D}bbb`, ['aaa', '', 'bbb']],
  ])('개별 항목 앞뒤 공백 처리', (input, output) => {
    expect(StringUtil.splitByDefaultDelimiter(input)).toEqual(output);
  });
});
