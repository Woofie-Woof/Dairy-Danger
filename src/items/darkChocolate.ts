import { HealthType } from "isaacscript-common";
import { CollectibleTypeCustom, HeartSubTypeCustom } from "../constants";

const HeartConversions = new Map<HeartSubType, number>([
  [HeartSubType.HEART_FULL, HeartSubType.HEART_BLACK],
  [HeartSubType.HEART_ROTTEN, HeartSubType.HEART_BLACK],
  [HeartSubType.HEART_SOUL, HeartSubType.HEART_BLACK],
  [HeartSubType.HEART_SCARED, HeartSubType.HEART_BLACK],
  [HeartSubType.HEART_DOUBLEPACK, HeartSubType.HEART_BLACK],
  [HeartSubType.HEART_BLENDED, HeartSubType.HEART_BLACK],
  [HeartSubType.HEART_BONE, HeartSubTypeCustom.HALF_BLACK],
  [HeartSubType.HEART_ETERNAL, HeartSubTypeCustom.HALF_BLACK],
  [HeartSubType.HEART_HALF, HeartSubTypeCustom.HALF_BLACK],
  [HeartSubType.HEART_HALF_SOUL, HeartSubTypeCustom.HALF_BLACK],
]);

export function checkHasItem(pickup: EntityPickup) {
  const game = Game();
  const numPlayers = game.GetNumPlayers();
  for (let i = 0; i < numPlayers; i++) {
    const player = Isaac.GetPlayer(i);
    if (
      player !== undefined &&
      player.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_DARK_CHOCOLATE) &&
      pickup.Variant === PickupVariant.PICKUP_HEART
    ) {
      changeHearts(pickup);
    }
  }
}

export function applyEffect(player: EntityPlayer) {
  const playerRedHearts = player.GetHearts();
  player.AddMaxHearts(playerRedHearts * -1, true);

  player.AddBlackHearts(playerRedHearts);
}

export function changeHearts(pickup: EntityPickup) {
  if (
    pickup.SubType !== HeartSubType.HEART_BLACK &&
    pickup.SubType !== HeartSubTypeCustom.HALF_BLACK
  ) {
    let convertedType = HeartConversions.get(pickup.SubType);

    if (convertedType === undefined) convertedType = pickup.SubType;

    const spawnedBlackHeart = Isaac.Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_HEART,
      convertedType,
      pickup.Position,
      Vector.Zero,
      undefined,
    ).ToPickup();

    if (pickup.IsShopItem() && spawnedBlackHeart !== undefined) {
      spawnedBlackHeart.ClearEntityFlags(EntityFlag.FLAG_APPEAR);
      spawnedBlackHeart.Price = pickup.Price;
      spawnedBlackHeart.ShopItemId = pickup.ShopItemId;
    }

    pickup.Remove();
  }
}

export function changeHealthUp(
  player: EntityPlayer,
  amount: int,
  healthType: HealthType,
) {
  if (healthType === HealthType.MAX_HEARTS)
    player.AddMaxHearts(amount * -1, true);

  if (healthType === HealthType.BONE) player.AddBoneHearts(amount * -1);

  if (healthType === HealthType.SOUL) player.AddSoulCharge(amount * -1);

  if (healthType === HealthType.ETERNAL) player.AddEternalHearts(amount * -1);

  player.AddBlackHearts(amount);
}
