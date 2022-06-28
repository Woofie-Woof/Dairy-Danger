import {
  EffectVariant,
  EntityType,
  ModCallback,
} from "isaac-typescript-definitions";
import { VectorZero } from "isaacscript-common";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.PRE_TEAR_COLLISION, main);
}

function main(projectile: EntityTear, collider: Entity) {
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
      VectorZero,
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
