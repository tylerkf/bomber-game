import * as THREE from 'three';
import Entity from './Entity';

const PARTICLE_SIZE = 0.2;
const PARTICLE_AMOUNT = 500;
const PARTICLE_SPEED = 0.02;
const PARTICLE_COLOR = 0xFF000F;

class Explosion extends Entity {

  constructor(x, y) {
    super();
    this.geometry = new THREE.Geometry();
    this.directions = [];

    for (let i = 0; i < PARTICLE_AMOUNT; i ++)
    {
      var vertex = new THREE.Vector3(x, y, 0.5);

      this.geometry.vertices.push( vertex );
      this.directions.push({
        x:(Math.random() * PARTICLE_SPEED)-(PARTICLE_SPEED/2),
        y:(Math.random() * PARTICLE_SPEED)-(PARTICLE_SPEED/2),
        z:(Math.random() * PARTICLE_SPEED)-(PARTICLE_SPEED/2)
      });
    }

    this.material = new THREE.PointsMaterial({size: PARTICLE_SIZE, color: PARTICLE_COLOR});
    this.mesh = new THREE.Points(this.geometry, this.material );

  }

  update() {
    let p = PARTICLE_AMOUNT;
    while(p--) {
      let particle =  this.mesh.geometry.vertices[p];
      particle.y += this.directions[p].y;
      particle.x += this.directions[p].x;
      particle.z += this.directions[p].z;
    }

    this.mesh.geometry.verticesNeedUpdate = true;
  }

}

export default Explosion;
