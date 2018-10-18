import SAT from 'sat';

class CollisionEngine {

  run(player, entities, delta) {
    // check collision with all colliders
    for (let i = 0; i < entities.length; i++) {
      if (entities[i].collider !== undefined) {
        const response = new SAT.Response();
        const collided = SAT.testPolygonPolygon(
          player.collider.bounds,
          entities[i].collider.bounds,
          response
        );

        if (collided) {
          player.onCollision(response.overlapN, response.overlapV);
        }
      }
    }
  }
}

export default CollisionEngine;