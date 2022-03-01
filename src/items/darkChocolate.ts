import { HealthType } from "isaacscript-common";
import { CollectibleTypeCustom } from "../constants";

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
  if (pickup.SubType !== HeartSubType.HEART_BLACK) {
    Isaac.Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_HEART,
      HeartSubType.HEART_BLACK,
      pickup.Position,
      Vector.Zero,
      undefined,
    );
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
