import * as THREE from 'three';
import Animated from './Animated';
import MovingCollider from '../utilities/Collision/MovingCollider';

const IDLE = 'idle';
const WALK = 'walk';
const RUN = 'run';

const FORWARDS = new THREE.Vector3(0, 1, 0);
const LEFT = new THREE.Vector3(-1, 0, 0);
const BACKWARDS = new THREE.Vector3(0, -1, 0);
const RIGHT = new THREE.Vector3(1, 0, 0);

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

const ANGULAR_VELOCITY = 6.;

class Player extends Animated {
  constructor(model, name='Player') {
    super(model);

    this.name = name;

    this.collider = new MovingCollider(0.4, 0.2);

    // either IDLE, WALK or RUN
    this.state = IDLE;
    this.velocity = new THREE.Vector3();
    this.targetVelocity = new THREE.Vector3();

    this.isdead = false;
  }

  onCollision(overlapN, overlapV) {
    const newPosition = this.position.clone();
    newPosition.x -= overlapV.x;
    newPosition.y -= overlapV.y;
    this.setPosition(newPosition);

    if (overlapN.x !== 0) {
      this.velocity.x = 0;
    }

    if (overlapN.y !== 0) {
      this.velocity.y = 0;
    }
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
    if (dot >= 0) {
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

  velocityToAnimationWeights(velocity) {
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

  updateVelocity(delta) {
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
  }

  updateAngle(delta) {
    let targetAngle = 0;

    // get angle correct in [-pi/2, pi/2]
    if (this.velocity.x !== 0) {
      targetAngle += Math.atan(this.velocity.y / this.velocity.x);
    } else {
      targetAngle += Math.sign(this.velocity.y) * Math.PI / 2;
    }

    // flip if in outside of [-pi/2, pi/2]
    if (this.velocity.x < 0) {
      if (targetAngle > Math.PI / 2) {
        targetAngle -= Math.PI;
      } else {
        targetAngle += Math.PI;
      }
    }

    // correct for THREE js
    targetAngle -= Math.PI / 2;

    const difference = Math.abs(targetAngle - this.angle)

    if (difference < ANGULAR_VELOCITY * delta
      || 2 * Math.PI - difference < ANGULAR_VELOCITY * delta) {
      this.setAngle(targetAngle);
    } else {
      let change;
      if (difference < 2 * Math.PI - difference) {
        change = Math.sign(targetAngle - this.angle) * ANGULAR_VELOCITY * delta;
      } else {
        change = - Math.sign(targetAngle - this.angle) * ANGULAR_VELOCITY * delta;
      }
      this.setAngle(this.angle + change);
    }
  }

  update(delta, allowMovement = true) {
    this.updateVelocity(delta);

    const speed = this.velocity.length();

    // update position
    if (speed !== 0 && allowMovement) {
      const change = this.velocity.clone();
      change.multiplyScalar(delta);

      const newPosition = this.position.clone().add(change);
      this.setPosition(newPosition);
    }

    // update animation weights
    if (speed !== 0) {
      // TODO - add more animations
      const weights = this.velocityToAnimationWeights(this.velocity);
      super.setAnimationWeights(weights);
    } else {
      super.setAnimationWeights({});
    }

    // TODO - seperate velocity and mesh animation

    // update rotation
    if (speed !== 0) {
      this.updateAngle(delta);
    }

    this.collider.updateBounds(this.position.x, this.position.y, this.angle);

    this.mesh.visible = !this.isdead;

    super.update(delta);
  }
}

export default Player;
