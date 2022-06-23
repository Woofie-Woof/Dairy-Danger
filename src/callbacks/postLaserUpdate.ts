import { EntityType, ModCallback } from "isaac-typescript-definitions";
import * as droppedIceCream from "../items/droppedIceCream";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_LASER_UPDATE, main);
}

function main(laser: EntityLaser) {
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
