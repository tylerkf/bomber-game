import SAT from 'sat';
import Collider from './Collider';

class MovingCollider extends Collider {
  constructor(width, height) {
    super(0, 0, width, height);
  }

  updateBounds(x, y, angle) {
    console.log(x, y, angle);
    const centre = new SAT.Vector(x, y);
    this.bounds = new SAT.Box(centre, this.width, this.height).toPolygon();
    const offset = new SAT.Vector(-this.width / 2, -this.height / 2)
    this.bounds.setOffset(offset);
    this.bounds.setAngle(angle);
  }
}

export default MovingCollider;
