import { EntityFlag, HeartSubType } from "isaac-typescript-definitions";
import {
  anyPlayerHasCollectible,
  HealthType,
  spawnHeart,
} from "isaacscript-common";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import { HeartSubTypeCustom } from "../enums/HeartSubTypeCustom";

const HEART_CONVERSION_MAP = new Map<HeartSubType, HeartSubType>([
  [HeartSubType.FULL, HeartSubType.BLACK],
  [HeartSubType.ROTTEN, HeartSubType.BLACK],
  [HeartSubType.SOUL, HeartSubType.BLACK],
  [HeartSubType.SCARED, HeartSubType.BLACK],
  [HeartSubType.DOUBLE_PACK, HeartSubType.BLACK],
  [HeartSubType.BLENDED, HeartSubType.BLACK],
  [HeartSubType.BONE, HeartSubTypeCustom.HALF_BLACK],
  [HeartSubType.ETERNAL, HeartSubTypeCustom.HALF_BLACK],
  [HeartSubType.HALF, HeartSubTypeCustom.HALF_BLACK],
  [HeartSubType.HALF_SOUL, HeartSubTypeCustom.HALF_BLACK],
]);

export function postPickupInitHeart(heart: EntityPickupHeart): void {
  checkHasItem(heart);
}

function checkHasItem(heart: EntityPickupHeart) {
  if (anyPlayerHasCollectible(CollectibleTypeCustom.DARK_CHOCOLATE)) {
    changeHearts(heart);
  }
}

export function applyEffect(player: EntityPlayer): void {
  const playerRedHearts = player.GetHearts();
  player.AddMaxHearts(playerRedHearts * -1, true);

  player.AddBlackHearts(playerRedHearts);
}

function changeHearts(heart: EntityPickupHeart) {
  if (
    heart.SubType === HeartSubType.BLACK ||
    heart.SubType === HeartSubTypeCustom.HALF_BLACK
  ) {
    return;
  }

  let convertedType = HEART_CONVERSION_MAP.get(heart.SubType);
  if (convertedType === undefined) {
    convertedType = heart.SubType;
  }

  const blackHeart = spawnHeart(convertedType, heart.Position);

  if (heart.IsShopItem()) {
    blackHeart.ClearEntityFlags(EntityFlag.APPEAR);
    blackHeart.Price = heart.Price;
    blackHeart.ShopItemId = heart.ShopItemId;
  }

  heart.Remove();
}

// ModCallbackCustom.POST_PLAYER_CHANGE_HEALTH
export function postPlayerChangeHealth(
  player: EntityPlayer,
  healthType: HealthType,
  difference: int,
): void {
  if (
    player.HasCollectible(CollectibleTypeCustom.DARK_CHOCOLATE) &&
    healthType !== HealthType.BLACK &&
    difference > 0
  ) {
    changeHealthUp(player, difference, healthType);
  }
}

function changeHealthUp(
  player: EntityPlayer,
  difference: int,
  healthType: HealthType,
) {
  if (healthType === HealthType.MAX_HEARTS) {
    player.AddMaxHearts(difference * -1, true);
  }

  if (healthType === HealthType.BONE) {
    player.AddBoneHearts(difference * -1);
  }

  if (healthType === HealthType.SOUL) {
    player.AddSoulCharge(difference * -1);
  }

  if (healthType === HealthType.ETERNAL) {
    player.AddEternalHearts(difference * -1);
  }

  player.AddBlackHearts(difference);
}
