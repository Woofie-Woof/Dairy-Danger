import { TrinketTypeCustom } from "../constants";

export function checkHasTrinket(player: EntityPlayer): void {
  if (player.HasTrinket(TrinketTypeCustom.TRINKET_LACTOSE_INTOLERANCE))
    applyEffect(player);
}

export function applyEffect(player: EntityPlayer): void {
  const game = Game();
  const frameCount = game.GetFrameCount();

  if (frameCount % 10 === 0) {
    const creep = Isaac.Spawn(
      EntityType.ENTITY_EFFECT,
      EffectVariant.PLAYER_CREEP_RED,
      0,
      player.Position,
      Vector.Zero,
      player,
    ).ToEffect();

    if (creep !== undefined) {
      creep.CollisionDamage = 3.5;
    }
  }
}
