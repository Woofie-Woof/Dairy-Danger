import { EffectVariant, EntityType } from "isaac-typescript-definitions";
import { game, VectorZero } from "isaacscript-common";
import { TrinketTypeCustom } from "../enums/TrinketTypeCustom";

export function postPEffectUpdate(player: EntityPlayer): void {
  checkHasTrinket(player);
}

function checkHasTrinket(player: EntityPlayer) {
  if (player.HasTrinket(TrinketTypeCustom.LACTOSE_INTOLERANCE)) {
    applyEffect(player);
  }
}

function applyEffect(player: EntityPlayer) {
  const frameCount = game.GetFrameCount();

  if (frameCount % 10 === 0) {
    const creep = Isaac.Spawn(
      EntityType.EFFECT,
      EffectVariant.CREEP_RED,
      0,
      player.Position,
      VectorZero,
      player,
    ).ToEffect();

    if (creep !== undefined) {
      creep.CollisionDamage = 3.5;
    }
  }
}
