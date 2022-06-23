import { EffectVariant, EntityType } from "isaac-typescript-definitions";
import { VectorZero } from "isaacscript-common";
import { TrinketTypeCustom } from "../constants";

export function checkHasTrinket(player: EntityPlayer): void {
  if (player.HasTrinket(TrinketTypeCustom.LACTOSE_INTOLERANCE))
    applyEffect(player);
}

export function applyEffect(player: EntityPlayer): void {
  const game = Game();
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
