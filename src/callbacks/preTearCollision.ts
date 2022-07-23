import { ModCallback } from "isaac-typescript-definitions";
import * as droppedIceCream from "../items/droppedIceCream";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.PRE_TEAR_COLLISION, main);
}

function main(projectile: EntityTear, collider: Entity): boolean | undefined {
  droppedIceCream.preTearCollision(projectile, collider);
  return undefined;
}
