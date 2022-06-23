import {
  EntityFlag,
  EntityType,
  HeartSubType,
  PickupVariant,
} from "isaac-typescript-definitions";
import { HealthType, VectorZero } from "isaacscript-common";
import { CollectibleTypeCustom, HeartSubTypeCustom } from "../constants";

const HeartConversions = new Map<HeartSubType, number>([
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

export function checkHasItem(pickup: EntityPickup): void {
  const game = Game();
  const numPlayers = game.GetNumPlayers();
  for (let i = 0; i < numPlayers; i++) {
    const player = Isaac.GetPlayer(i);
    if (
      player !== undefined &&
      player.HasCollectible(CollectibleTypeCustom.DARK_CHOCOLATE) &&
      pickup.Variant === PickupVariant.HEART
    ) {
      changeHearts(pickup);
    }
  }
}

export function applyEffect(player: EntityPlayer): void {
  const playerRedHearts = player.GetHearts();
  player.AddMaxHearts(playerRedHearts * -1, true);

  player.AddBlackHearts(playerRedHearts);
}

export function changeHearts(pickup: EntityPickup): void {
  if (
    pickup.SubType !== HeartSubType.BLACK &&
    pickup.SubType !== HeartSubTypeCustom.HALF_BLACK
  ) {
    let convertedType = HeartConversions.get(pickup.SubType);

    if (convertedType === undefined) convertedType = pickup.SubType;

    const spawnedBlackHeart = Isaac.Spawn(
      EntityType.PICKUP,
      PickupVariant.HEART,
      convertedType,
      pickup.Position,
      VectorZero,
      undefined,
    ).ToPickup();

    if (pickup.IsShopItem() && spawnedBlackHeart !== undefined) {
      spawnedBlackHeart.ClearEntityFlags(EntityFlag.APPEAR);
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
): void {
  if (healthType === HealthType.MAX_HEARTS)
    player.AddMaxHearts(amount * -1, true);

  if (healthType === HealthType.BONE) player.AddBoneHearts(amount * -1);

  if (healthType === HealthType.SOUL) player.AddSoulCharge(amount * -1);

  if (healthType === HealthType.ETERNAL) player.AddEternalHearts(amount * -1);

  player.AddBlackHearts(amount);
}
