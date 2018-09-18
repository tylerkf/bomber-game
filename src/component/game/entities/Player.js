import * as THREE from 'three';
import Animated from './Animated';

const IDLE = 'idle';
const WALK = 'walk';
const RUN = 'run';

const FORWARDS = new THREE.Vector3(1, 0, 0);
const LEFT = new THREE.Vector3(0, 0, -1);
const BACKWARDS = new THREE.Vector3(-1, 0, 0);
const RIGHT = new THREE.Vector3(0, 0, 1);

const ACCELERATIONS = {
  'idle': 5.,
  'walk': 5.,
  'run': 8.

};

const SPEEDS = {
  'idle': 0.,
  'walk': 1.5,
  'run': 4
};

class Player extends Animated {
  constructor(model) {
    super(model);

    // either IDLE, WALK or RUN
    this.state = IDLE;
    this.velocity = new THREE.Vector3();
    this.targetVelocity = new THREE.Vector3();
  }

	onAction(action, stop) {
    if (!stop) {
      switch (action) {
        case 'walkForwards':
          this.moveDirection(FORWARDS);
          break;
        case 'walkLeft':
          this.moveDirection(LEFT);
          break;
        case 'walkBackwards':
          this.moveDirection(BACKWARDS);
          break;
        case 'walkRight':
          this.moveDirection(RIGHT);
          break;
        case 'runForwards':
          this.state = RUN;
          this.moveDirection(FORWARDS);
          break;
        default:
          ;
      }
    } else {
      switch (action) {
        case 'walkForwards':
          this.stopDirection(FORWARDS);
          break;
        case 'walkLeft':
          this.stopDirection(LEFT);
          break;
        case 'walkBackwards':
          this.stopDirection(BACKWARDS);
          break;
        case 'walkRight':
          this.stopDirection(RIGHT);
          break;
        case 'runForwards':
          this.state = WALK;
          this.stopDirection(FORWARDS);
          break;
        default:
          ;
      }
    }
	}

  moveDirection(direction) {
    const targetDirection = this._velocityToDirection(this.targetVelocity)

    const dot = targetDirection.dot(direction);
    if (dot <= 0) {
      targetDirection.add(direction);
      if (this.state !== RUN && targetDirection.length() !== 0) {
        this.state = WALK ;
      } else if (targetDirection.length() === 0) {
        this.state = IDLE;
      }
    }

    const targetSpeed = SPEEDS[this.state];
    this.targetVelocity.copy(targetDirection.normalize().multiplyScalar(targetSpeed));
  }

  stopDirection(direction) {
    const targetDirection = this._velocityToDirection(this.targetVelocity)

    const dot = targetDirection.dot(direction);
    if (dot >=0) {
      targetDirection.sub(direction);
      if (this.state !== RUN && targetDirection.length() !== 0) {
        this.state = WALK ;
      } else if (targetDirection.length() === 0) {
        this.state = IDLE;
      }
    }

    const targetSpeed = SPEEDS[this.state];
    this.targetVelocity.copy(targetDirection.normalize().multiplyScalar(targetSpeed));
  }

  _velocityToDirection(velocity) {
    const direction = new THREE.Vector3();
    direction.x = Math.sign(velocity.x);
    direction.y = Math.sign(velocity.y);
    direction.z = Math.sign(velocity.z);

    return direction;
  }

  _velocityToAnimationWeights(velocity) {
    const speed = velocity.length();
    const weights = {};

    if (speed <= SPEEDS[WALK]) {
      // idle to walk
      const weight = speed / SPEEDS[WALK];
      weights[IDLE] = 1 - weight;
      weights[WALK] = weight;
    } else if (speed <= SPEEDS[RUN]) {
      // walk to run
      const weight = (speed - SPEEDS[WALK]) / (SPEEDS[RUN] - SPEEDS[WALK]);
      weights[WALK] = 1 - weight;
      weights[RUN] = weight;
    }

    return weights;
  }

  update(delta) {
    // update velocity
    if (!this.velocity.equals(this.targetVelocity)) {
      const acceleration = ACCELERATIONS[this.state];
      if (this.velocity.distanceTo(this.targetVelocity) < acceleration * delta) {
        // within range to stop fading
        this.velocity.copy(this.targetVelocity);
      } else {
        // fade to target velocity
        const changeDirection = this.targetVelocity.clone()
        changeDirection.sub(this.velocity).normalize();
        this.velocity.add(changeDirection.multiplyScalar(acceleration * delta));
      }
    }

    const speed = this.velocity.length();
    // update position
    if (speed !== 0) {
      const change = this.velocity.clone()
      change.multiplyScalar(delta)

      const newPosition = this.position.clone().add(change)
      this.setPosition(newPosition);
    }

    // update animation weights
    if (speed !== 0) {
      // TODO - add more animations
      const weights = this._velocityToAnimationWeights(this.velocity);
      super.setAnimationWeights(weights);
    } else {
      super.setAnimationWeights({});
    }

    super.update(delta);
  }
}

export default Player;
