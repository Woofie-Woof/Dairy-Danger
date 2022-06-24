import { CacheFlag, ModCallback } from "isaac-typescript-definitions";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";

const MIN_FIRE_DELAY = 5;

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.EVALUATE_CACHE, fireDelay, CacheFlag.FIRE_DELAY); // 1 << 1
}

// CacheFlag.FIRE_DELAY (1 << 1)
export function fireDelay(player: EntityPlayer): void {
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

  const playerData = player.GetData();
  if (
    player.HasCollectible(CollectibleTypeCustom.BOBS_TEA) &&
    playerData["currentBobsTeaBonus"] === undefined
  ) {
    playerData["currentBobsTeaBonus"] = 0;
  }

  if (playerData["currentBobsTeaBonus"] !== undefined) {
    player.MaxFireDelay /= 0.8 + Number(playerData["currentBobsTeaBonus"]);
  }
}
