import { MissionUtils } from '@woowacourse/mission-utils';

import RaceManager from '../../src/domain/RaceManager.js';
import Car from '../../src/domain/Car.js';
import DEFAULT_VALUES from '../../src/consts/default_values.js';

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    MissionUtils.Random.pickNumberInRange,
  );
};

describe('레이스 메니저 객체 생성 테스트', () => {
  test('유효한 라운드 수로 객체 생성 및 초기값 확인', () => {
    const raceManager = new RaceManager(10);

    expect(raceManager.getNumOfRounds()).toBe(10);
    expect(raceManager.getParticipants()).toEqual([]);
    expect(raceManager.getRoundResults()).toEqual([]);
  });
});

describe('참가자 추가 테스트', () => {
  test('참가자 추가 확인', () => {
    const raceManager = new RaceManager(1);
    raceManager.addParticipant('a');
    raceManager.addParticipant('b');

    const participants = raceManager.getParticipants();
    expect(participants.length).toBe(2);
  });

  test('Car 객체 생성 확인', () => {
    const raceManager = new RaceManager(1);
    raceManager.addParticipant('a');
    raceManager.addParticipant('b');

    const participants = raceManager.getParticipants();
    participants.forEach((participant) => {
      expect(participant).toBeInstanceOf(Car);
    });
  });
});

describe('라운드 진행 및 저장 테스트', () => {
  test('현재 참가자들 위치 가져오기', () => {
    const raceManager = new RaceManager(1);
    raceManager.addParticipant('a');
    raceManager.addParticipant('b');

    const positions = [
      { name: 'a', position: 0 },
      { name: 'b', position: 0 },
    ];

    expect(raceManager.getCurrentPositions()).toEqual(positions);
  });

  test('모든 참가자의 decideMovement 호출 및 위치 변경 확인', () => {
    const raceManager = new RaceManager(1);
    raceManager.addParticipant('a');
    raceManager.addParticipant('b');

    mockRandoms([
      DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD, // a : 움직임
      DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD - 1, // b : 안 움직임
    ]);
    raceManager.runRound();

    const participants = raceManager.getParticipants();
    expect(participants[0].getPosition()).toBe(1);
    expect(participants[1].getPosition()).toBe(0);
  });

  test('addRoundResult로 결과 추가 및 누적 확인', () => {
    const raceManager = new RaceManager(2);
    const round1 = [
      { name: 'a', position: 1 },
      { name: 'b', position: 0 },
    ];
    const round2 = [
      { name: 'a', position: 2 },
      { name: 'b', position: 1 },
    ];
    raceManager.addRoundResult(round1);
    raceManager.addRoundResult(round2);

    const results = raceManager.getRoundResults();
    expect(results.length).toBe(2);
    expect(results[0]).toEqual(round1);
    expect(results[1]).toEqual(round2);
  });
});

describe('전체 흐름 테스트', () => {
  test('지정한 라운드 수만큼 실행하고 결과 저장 확인', () => {
    const raceManager = new RaceManager(2);
    raceManager.addParticipant('a');
    raceManager.addParticipant('b');

    mockRandoms([
      DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD, // round1 a : 움직임
      DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD - 1, // round1 b : 안 움직임
      DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD - 1, // round2 a : 안 움직임
      DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD, // round2 b : 움직임
    ]);
    raceManager.startRace();

    const results = raceManager.getRoundResults();
    expect(results.length).toBe(2);

    const participants = raceManager.getParticipants();
    expect(participants[0].getPosition()).toBe(1);
    expect(participants[1].getPosition()).toBe(1);
  });
});

describe('우승자 결정 테스트', () => {
  test('최대 위치 참가자 단일 우승자 반환', () => {
    const raceManager = new RaceManager(1);
    raceManager.addParticipant('a');
    raceManager.addParticipant('b');

    mockRandoms([
      DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD, // a : 움직임
      DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD - 1, // b : 안 움직임
    ]);
    raceManager.startRace();

    expect(raceManager.retrieveWinners()).toEqual(['a']);
  });

  test('공동 우승자 처리', () => {
    const raceManager = new RaceManager(1);
    raceManager.addParticipant('a');
    raceManager.addParticipant('b');

    mockRandoms([
      DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD, // a : 움직임
      DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD, // b : 움직임
    ]);
    raceManager.startRace();

    expect(raceManager.retrieveWinners()).toEqual(['a', 'b']);
  });
});
