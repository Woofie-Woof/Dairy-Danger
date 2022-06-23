import {
  EntityFlag,
  EntityType,
  SoundEffect,
} from "isaac-typescript-definitions";
import {
  characterCanHaveSoulHearts,
  doesPlayerHaveAllBlackHearts,
  isBethany,
  sfxManager,
} from "isaacscript-common";
import { HeartSubTypeCustom } from "../constants";

// PickupVariant.HEART (10)
export function heart(
  pickup: EntityPickupHeart,
  collider: Entity,
  _low: boolean,
): boolean | void {
  if (pickup.SubType === HeartSubTypeCustom.HALF_BLACK) {
    return halfBlack(pickup, collider);
  }

  return undefined;
}

// HeartSubTypeCustom.HALF_BLACK
function halfBlack(
  pickup: EntityPickupHeart,
  collider: Entity,
): boolean | void {
  if (collider.Type !== EntityType.PLAYER) {
    return undefined;
  }

  const player = collider.ToPlayer();
  if (player === undefined) {
    return undefined;
  }

  const character = player.GetPlayerType();
  const sprite = pickup.GetSprite();
  const maxHearts = player.GetMaxHearts();
  const soulHearts = player.GetSoulHearts();

  if (maxHearts + soulHearts === 24 && doesPlayerHaveAllBlackHearts(player)) {
    return undefined;
  }

  if (!sprite.IsPlaying("Collect")) {
    if (characterCanHaveSoulHearts(character)) {
      player.AddBlackHearts(1);
    } else if (isBethany(player)) {
      player.AddSoulCharge(1);
    }

    sfxManager.Play(SoundEffect.UNHOLY);
    sprite.Play("Collect", true);
    pickup.AddEntityFlags(EntityFlag.NO_KNOCKBACK);
    pickup.AddEntityFlags(EntityFlag.NO_PHYSICS_KNOCKBACK);
  }

  return true;
}
