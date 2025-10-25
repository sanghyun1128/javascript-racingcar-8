import { MissionUtils } from '@woowacourse/mission-utils';

import Validator from '../utils/Validator.js';
import DEFAULT_VALUES from '../consts/default_values.js';

class Car {
  constructor(name) {
    Validator.validateName(name);
    this.name = name;
    this.position = 0;
  }

  getName() {
    return this.name;
  }

  getPosition() {
    return this.position;
  }

  moveForward() {
    if (this.constructor.decideMovement()) this.position += 1;
  }

  static decideMovement() {
    const pickedNumber = MissionUtils.Random.pickNumberInRange(
      DEFAULT_VALUES.RANDOM_NUMBER_MIN,
      DEFAULT_VALUES.RANDOM_NUMBER_MAX,
    );

    if (pickedNumber >= DEFAULT_VALUES.MOVE_FORWARD_THRESHOLD) return true;
    return false;
  }
}

export default Car;
