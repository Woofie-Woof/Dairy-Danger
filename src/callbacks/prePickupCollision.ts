import {
  EntityFlag,
  EntityType,
  ModCallback,
  PickupVariant,
  SoundEffect,
} from "isaac-typescript-definitions";
import {
  characterCanHaveSoulHearts,
  doesPlayerHaveAllBlackHearts,
  isBethany,
  sfxManager,
} from "isaacscript-common";
import { HeartSubTypeCustom } from "../enums/HeartSubTypeCustom";

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallback.PRE_PICKUP_COLLISION,
    heartCallback,
    PickupVariant.HEART, // 10
  );
}

// PickupVariant.HEART (10)
function heartCallback(
  pickup: EntityPickup,
  collider: Entity,
  _low: boolean,
): boolean | undefined {
  const heart = pickup as EntityPickupHeart;

  if (heart.SubType === HeartSubTypeCustom.HALF_BLACK) {
    return halfBlack(heart, collider);
  }

  return undefined;
}

// HeartSubTypeCustom.HALF_BLACK
function halfBlack(
  heart: EntityPickupHeart,
  collider: Entity,
): boolean | undefined {
  if (collider.Type !== EntityType.PLAYER) {
    return undefined;
  }

  const player = collider.ToPlayer();
  if (player === undefined) {
    return undefined;
  }

  const character = player.GetPlayerType();
  const sprite = heart.GetSprite();
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
    heart.AddEntityFlags(EntityFlag.NO_KNOCKBACK);
    heart.AddEntityFlags(EntityFlag.NO_PHYSICS_KNOCKBACK);
  }

  return true;
}
