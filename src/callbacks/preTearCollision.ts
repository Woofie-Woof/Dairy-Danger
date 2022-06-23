import { EffectVariant, EntityType } from "isaac-typescript-definitions";

export function main(projectile: EntityTear, collider: Entity): void {
  const projectileData = projectile.GetData();
  if (
    projectileData["iceCream"] !== undefined &&
    projectileData["iceCream"] === true &&
    collider.Type !== EntityType.FAMILIAR &&
    collider.Type !== EntityType.PLAYER
  ) {
    const creep = Isaac.Spawn(
      EntityType.EFFECT,
      EffectVariant.CREEP_SLIPPERY_BROWN,
      0,
      collider.Position,
      Vector.Zero,
      undefined,
    );

    const creepData = creep.GetData();
    const iceCreamColor = projectile.GetColor();

    creepData["iceCream"] = true;
    creepData["iceCreamR"] = iceCreamColor.R;
    creepData["iceCreamG"] = iceCreamColor.G;
    creepData["iceCreamB"] = iceCreamColor.B;
  }
}
