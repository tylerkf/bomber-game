import * as THREE from 'three';
import Animated from './Animated';

const IDLE = 'idle';
const WALK = 'walk';
const RUN = 'run';

const ACCELERATION = 1.;

const STATE_VELOCITIES = {
  IDLE: 0.,
  WALK: 1.,
  RUN: 2.
};

class Player extends Animated {
  constructor(model) {
    super(model);

    // either IDLE, WALK or RUN
    this.state = IDLE;
    this.velocity = THREE.Vector3(0, 0, 0);
  }

	onAction(action, stop) {
    if (!stop) {
      switch (action) {
        case 'walkForwards':
          this.state = WALK;
          break;
        case 'runForwards':
          this.state = RUN;
      }
    } else {
      switch (action) {
        case 'walkForwards':
          if (this.state == WALK) {
            this.state = IDLE;
          }
          break;
        case 'runForwards':
          if (this.state == RUN) {
            this.state = IDLE;
          }
      }
    }
	}

  update(delta) {
    const targetVelocity = STATE_VELOCITIES[this.state];
    if (this.velocity != targetVelocity) {
      const distance = targetVelocity.distanceTo(this.velocity);
      const direction = targetVelocity.sub(this.velocity).normalize();
      if (distance < ACCELERATION * delta) {
        this.velocity = targetVelocity;
      } else {
        const direction = targetVelocity.sub(this.velocity).normalize();
        const change = direction.multiplyScalar(ACCELERATION * delta)
        this.velocity = this.velocity.add(change)
      }
    }
  }
}

export default Player;
