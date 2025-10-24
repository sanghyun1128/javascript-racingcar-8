import { MissionUtils } from '@woowacourse/mission-utils';

import Car from '../../src/domain/Car.js';
import DEFAULT_VALUES from '../../src/consts/default_values.js';

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    MissionUtils.Random.pickNumberInRange,
  );
};

describe('자동차 객체 생성 테스트', () => {
  test('유효한 이름으로 객체 생성 및 초기값 확인', () => {
    const car = new Car('pobi');

    expect(car.getName()).toBe('pobi');
    expect(car.getPosition()).toBe(0);
  });
});

describe('위치 테스트', () => {
  test('위치 가져오기', () => {
    const car = new Car('pobi');

    expect(car.getPosition()).toBe(0);
  });

  test('전진 후 위치 가져오기', () => {
    const car = new Car('pobi');
    car.moveForward();

    expect(car.getPosition()).toBe(1);
  });
});

describe('자동차 랜덤 전진 테스트', () => {
  test('전진하는 경우', () => {
    mockRandoms([DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD]);
    const car = new Car('pobi');
    const willMove = car.decideMovement();

    expect(willMove).toBe(true);
  });

  test('전진하지 않는 경우', () => {
    mockRandoms([DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD - 1]);
    const car = new Car('pobi');
    const willMove = car.decideMovement();

    expect(willMove).toBe(false);
  });

  test('경계값 일 경우', () => {
    mockRandoms([
      DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD - 1, // 전진하지 않음
      DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD, // 전진함
    ]);
    const carA = new Car('a');
    expect(carA.decideMovement()).toBe(false);

    const carB = new Car('b');
    expect(carB.decideMovement()).toBe(true);
  });
});
