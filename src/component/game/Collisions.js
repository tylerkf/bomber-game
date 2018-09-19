import * as THREE from 'three';

const CLASSES = {
  box: 0,
  moving: 1
}

class Collisions {
  constructor() { }

  static get classes() {
    return CLASSES;
  }

  run(entities, delta) {
    const boxPositions = [];
    const movingBounds = [];

    for (let i = 0; i < entities.length; i++) {
      if (entities[i].collisionClass === undefined) {
        continue;
      } else if (entities[i].collisionClass == CLASSES.box) {
        boxPositions.push(entities[i].position);
      }
    }

    for (let i = 0; i < entities.length; i++) {
      if (entities[i].collisionClass === undefined) {
        continue;
      } else if (entities[i].collisionClass == CLASSES.moving) {
        const moving = entities[i];
        const rotation = 0;
        const bounds = {
          x: moving.position.x,
          y: moving.position.y,
          w: moving.width,
          h: moving.height,
          r: rotation
        };

        const collidedBoxPositions = this.hasCollided(bounds, boxPositions);
        if (collidedBoxPositions.length !== 0) {
          console.log('collided');
          console.log(collidedBoxPositions);
          for (let i = 0; i < collidedBoxPositions.length; i++) {
            const box = collidedBoxPositions[i];
            if (moving.position.x > box.x + 0.5) {
              console.log('left');
              // stop horizontal velocity left
              if (moving.velocity.x < 0) {
                moving.position.x -= moving.velocity.x * delta;
                moving.velocity.x = 0
              }
            }
            if (moving.position.x < box.x - 0.5) {
              console.log('right');
              // stop horizontal velocity right
              if (moving.velocity.x > 0) {
                moving.position.x -= moving.velocity.x * delta;
                moving.velocity.x = 0
              }
            }
            if (moving.position.y > box.y + 0.5) {
              console.log('down');
              // stop vertical velocity down
              if (moving.velocity.y < 0) {
                moving.position.y -= moving.velocity.y * delta;
                moving.velocity.y = 0
              }
            }
            if (moving.position.y < box.y - 0.5) {
              console.log('up');
              // stop horizontal velocity up
              if (moving.velocity.y > 0) {
                moving.position.y -= moving.velocity.y * delta;
                moving.velocity.y = 0
              }
            }
          }
        }
      }
    }
  }

  // for rectangular bounds only
  hasCollided(bounds, boxPositions) {
    const maxRadius = Math.pow(Math.pow(bounds.w / 2, 2) + Math.pow(bounds.h / 2, 2), 0.5);

    const rotationMatrix = new THREE.Matrix3();
    rotationMatrix.setUvTransform (0, 0, 0, 0, bounds.r, bounds.x, bounds.y);
    const rotationInverse = new THREE.Matrix3();
    rotationInverse.setUvTransform (0, 0, 0, 0, -bounds.r, bounds.x, bounds.y);

    const boundCorners = [];
    this._getCorners(boundCorners, bounds.x, bounds.y, bounds.w, bounds.h);
    this._applyMatrixToVectors(boundCorners, rotationMatrix);

    const boxCorners = [];

    const collidedBoxPositions = [];

    // check if collided with all boxes
    for (let i = 0; i < boxPositions.length; i++) {
      const box = boxPositions[i];

      // ignore boxes outside of maxRadius
      if (box.x + 0.5 <= bounds.x - maxRadius || box.x - 0.5 >= bounds.x + maxRadius
        || box.y + 0.5 <= bounds.y - maxRadius || box.y - 0.5 >= bounds.y + maxRadius) {
        // outside of max radius
        continue;
      }

      // check if bound corners are in box
      for (let j = 0; j < boundCorners.length; j++) {
        if (boundCorners[j].x < box.x + 0.5 && boundCorners[j].x > box.x - 0.5
          && boundCorners[j].y < box.y + 0.5 && boundCorners[j].y > box.y - 0.5) {
          // corner intersected box
          collidedBoxPositions.push(box);
          continue;
        }
      }

      // get box corners
      this._getCorners(boxCorners, box.x, box.y, 1, 1);
      this._applyMatrixToVectors(boxCorners, rotationInverse);

      // check if box corners intersect bounds
      for (let j = 0; j < 4; j++) {
        if (boxCorners[j].x < bounds.x + bounds.w/2 && boxCorners[j].x > bounds.x - bounds.w/2
          && boxCorners[j].y < bounds.y + bounds.h/2 && boxCorners[j].y > bounds.y - bounds.h/2) {
          // corner intersected box
          collidedBoxPositions.push(box);
          continue;
        }
      }
    }
    return collidedBoxPositions;
  }

  _getCorners(vectors, x, y, w, h) {
    if (vectors.length < 4) {
      for (let i = 0; i < 4; i++) {
        vectors.push(new THREE.Vector3());
      }
    }

    const hw = w / 2;
    const hh = h / 2;

    vectors[0].set(x + hw, y + hh, 0);
    vectors[1].set(x + hw, y - hh, 0);
    vectors[2].set(x - hw, y + hh, 0);
    vectors[3].set(x - hw, y - hh, 0);
  }

  _applyMatrixToVectors(vectors, matrix) {
    for (let i = 0; i < matrix.length; i++) {
      vectors[i].applyMatrix3(matrix)
    }
  }
}

export default Collisions;
