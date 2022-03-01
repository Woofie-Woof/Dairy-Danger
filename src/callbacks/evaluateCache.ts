import { CollectibleTypeCustom } from "../constants";

const MIN_FIRE_DELAY = 5;

export function main(player: EntityPlayer, cacheFlag: CacheFlag): void {
  if (cacheFlag === CacheFlag.CACHE_FIREDELAY) {
    if (player.MaxFireDelay > MIN_FIRE_DELAY) {
      const bonus = math.min(
        1.7 *
          player.GetCollectibleNum(
            CollectibleTypeCustom.COLLECTIBLE_DROPPED_ICE_CREAM,
          ),
        player.MaxFireDelay - MIN_FIRE_DELAY,
      );
      player.MaxFireDelay -= bonus;
    }

    const playerData = player.GetData();
    if (
      player.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_BOBS_TEA) &&
      playerData.currentBobsTeaBonus === undefined
    )
      playerData.currentBobsTeaBonus = -0.2;

    if (playerData.currentBobsTeaBonus !== undefined)
      player.MaxFireDelay /= 1 + Number(playerData.currentBobsTeaBonus);
  }
}
