import * as THREE from 'three';
import SAT from 'sat';

const CLASSES = {
  box: 0,
  moving: 1
}

class Collisions {
  constructor() { }

  static get classes() {
    return CLASSES;
  }

  static box(position, width, height) {
    const centre = new SAT.Vector(position.x, position.y);
    return new SAT.Box(centre, width, height);
  }

  run(entities, delta) {
    const boxPositions = [];
    const movingBounds = [];

    // get box colliders from entities
    for (let i = 0; i < entities.length; i++) {
      if (entities[i].collisionClass == CLASSES.box) {
        boxPositions.push(entities[i].position);
      }
    }

    // check collisions for moving entities
    for (let i = 0; i < entities.length; i++) {
      if (entities[i].collisionClass == CLASSES.moving) {

      }
    }
  }
}

export default Collisions;
