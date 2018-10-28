import SAT from 'sat';
import Collider from './Collider';

class StaticCollider extends Collider {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    const centre = new SAT.Vector(this.x, this.y);
    this.bounds = new SAT.Box(centre, this.width, this.height).toPolygon();
    const offset = new SAT.Vector(-this.width / 2, -this.height / 2);
    this.bounds.setOffset(offset);
  }
}

export default StaticCollider;
