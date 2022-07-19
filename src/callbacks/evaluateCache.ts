import { CacheFlag, ModCallback } from "isaac-typescript-definitions";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import * as bobsTea from "../items/bobsTea";

const MIN_FIRE_DELAY = 5;

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.EVALUATE_CACHE, fireDelay, CacheFlag.FIRE_DELAY); // 1 << 1
}

// CacheFlag.FIRE_DELAY (1 << 1)
function fireDelay(player: EntityPlayer) {
  if (player.MaxFireDelay > MIN_FIRE_DELAY) {
    const numDroppedIceCream = player.GetCollectibleNum(
      CollectibleTypeCustom.DROPPED_ICE_CREAM,
    );
    const bonus = math.min(
      1.7 * numDroppedIceCream,
      player.MaxFireDelay - MIN_FIRE_DELAY,
    );
    player.MaxFireDelay -= bonus;
  }

  bobsTea.evaluateCache(player);
}
