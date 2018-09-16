import * as THREE from 'three';
import Animated from './Animated';

const IDLE = 'idle';
const WALK = 'walk';
const RUN = 'run';

STATE_VELOCITIES = {
  IDLE: 0,
  WALK: 1,
  RUN: 2
}

class Player extends Animated {
  constructor(model) {
    super(model);

    // either IDLE, WALK or RUN
    this.state = IDLE;
    this.velocity = THREE.Vector3(0, 0, 0);
  }

	onAction(action) {
    switch (action) {
      case 'walkForwards':
        this.state = WALK;
      case 'runForwards':
        this.state = RUN;
    }
	}

  onStopAction(action) {
    switch (action) {
      case 'walkForwards':
        if (this.state == WALK) {
          this.state = IDLE;
        }
      case 'runForwards':
        if (this.state == RUN) {
          this.state = IDLE;
        }
    }
  }

  update(delta) {
    if (this.velocity != STATE_VELOCITIES[this.state]) {

    }
  }
}
