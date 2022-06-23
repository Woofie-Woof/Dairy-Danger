import {
  EntityFlag,
  EntityType,
  SoundEffect,
} from "isaac-typescript-definitions";
import {
  characterCanHaveSoulHearts,
  countSetBits,
  isBethany,
} from "isaacscript-common";
import { HeartSubTypeCustom } from "../constants";

export function main(
  pickup: EntityPickup,
  collider: Entity,
  _low: boolean,
): boolean | void {
  if (
    pickup.SubType === HeartSubTypeCustom.HALF_BLACK &&
    collider.Type === EntityType.PLAYER
  ) {
    const sprite = pickup.GetSprite();
    const player = collider.ToPlayer();

    if (player !== undefined) {
      if (
        player.GetMaxHearts() + player.GetSoulHearts() === 24 &&
        player.GetSoulHearts() === countSetBits(player.GetBlackHearts()) * 2
      ) {
        return undefined;
      }

      if (!sprite.IsPlaying("Collect")) {
        if (
          player !== undefined &&
          characterCanHaveSoulHearts(player.GetPlayerType())
        ) {
          player.AddBlackHearts(1);
        } else if (player !== undefined && isBethany(player)) {
          player.AddSoulCharge(1);
        }

        const sfx = SFXManager();
        sfx.Play(SoundEffect.UNHOLY);
        sprite.Play("Collect", true);
        pickup.AddEntityFlags(EntityFlag.NO_KNOCKBACK);
        pickup.AddEntityFlags(EntityFlag.NO_PHYSICS_KNOCKBACK);
      }

      return true;
    }
  }
  return undefined;
}
