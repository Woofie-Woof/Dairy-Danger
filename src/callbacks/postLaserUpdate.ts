import { EntityType } from "isaac-typescript-definitions";
import * as droppedIceCream from "../items/droppedIceCream";

export function main(laser: EntityLaser): void {
  if (laser.FrameCount === 1) {
    const tearParent = laser.SpawnerEntity;
    if (tearParent !== undefined && tearParent.Type === EntityType.PLAYER) {
      const parentAsPlayer = tearParent.ToPlayer();
      if (parentAsPlayer !== undefined) {
        droppedIceCream.checkHasItem(laser, parentAsPlayer);
      }
    }
  }
}
