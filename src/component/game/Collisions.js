import * as THREE from 'three';

class Collisions {
  constructor() {
    this.boxes = [];
  }

  addBox(id, x, y) {
    const box = { id, x, y };
    this.boxes.push(box)
  }

  removeBox(id) {
    for (let i = 0; i < this.boxes.length; i++) {
      if (this.boxes[i].id === id) {
        this.boxes.splice(i, 1);
      }
    }
  }

  // for rectangular bounds only
  hasCollided(x, y, w, h, rotation) {
    const maxRadius = Math.pow(Math.pow(w / 2, 2) + Math.pow(h / 2, 2), 0.5);

    const rotationMatrix = new THREE.Matrix3();
    rotationMatrix.setUvTransform (0, 0, 0, 0, rotation, x, y);
    const rotationInverse = new THREE.Matrix3();
    rotationInverse.setUvTransform (0, 0, 0, 0, -rotation, x, y);

    const boundCorners = [];
    this._getCorners(boundCorners, x, y, w, h);
    this._applyMatrixToVectors(boundCorners, rotationMatrix);

    const boxCorners = [];

    // check if collided with all boxes
    for (let i = 0; i < this.boxes.length; i++) {
      const box = this.boxes[i];

      // ignore boxes outside of maxRadius
      if (box.x + 0.5 <= x - maxRadius || box.x - 0.5 >= x + maxRadius
        || box.y + 0.5 <= y - maxRadius || box.y - 0.5 >= y + maxRadius) {
        // outside of max radius
        continue;
      }

      // check if bound corners are in box
      for (let i = 0; i < boundCorners.length; i++) {
        if (boundCorners[i].x < box.x + 0.5 && boundCorners[i].x > box.x - 0.5
          && boundCorners[i].y < box.y + 0.5 && boundCorners[i].y > box.y - 0.5) {
          // corner intersected box
          console.log('bound corners', box);
          return true;
        }
      }

      // get box corners
      this._getCorners(boxCorners, box.x, box.y, 1, 1);
      this._applyMatrixToVectors(boxCorners, rotationInverse);

      // check if box corners intersect bounds
      for (let i = 0; i < 4; i++) {
        if (boxCorners[i].x < x + w/2 && boxCorners[i].x > x - w/2
          && boxCorners[i].y < y + h/2 && boxCorners[i].y > y - h/2) {
          // corner intersected box
          console.log('box corners');
          return true;
        }
      }
    }
    // has not collided
    return false;
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
