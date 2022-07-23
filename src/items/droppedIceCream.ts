import { EffectVariant, EntityType } from "isaac-typescript-definitions";
import {
  DefaultMap,
  getPlayerFromTear,
  getRandomSeed,
  saveDataManager,
  spawnEffect,
} from "isaacscript-common";
import { DroppedIceCreamData } from "../classes/DroppedIceCreamData";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";

if (EID !== undefined) {
  const itemDescription =
    "↑ +0.5 Tears up#10% chance while firing to shoot an ice cream shot#Ice cream shot: 1.5x damage and creates slippery creep on impact";
  EID.addCollectible(CollectibleTypeCustom.DROPPED_ICE_CREAM, itemDescription);
}

const v = {
  room: {
    iceCreamTears: new DefaultMap<PtrHash, DroppedIceCreamData>(
      () => new DroppedIceCreamData(),
    ),
    iceCreamCreep: new DefaultMap<PtrHash, DroppedIceCreamData>(
      () => new DroppedIceCreamData(),
    ),
  },
};

export function init(): void {
  saveDataManager("droppedIceCream", v);
}

// ModCallbacksCustom.POST_TEAR_INIT_LATE
export function postTearInitLate(tear: EntityTear): void {
  const player = getPlayerFromTear(tear);
  if (player === undefined) {
    return;
  }

  checkHasItem(tear, player);
}

export function preTearCollision(
  projectile: EntityTear,
  collider: Entity,
): void {
  const projectilePointer = GetPtrHash(projectile);
  const projectileData =
    v.room.iceCreamTears.getAndSetDefault(projectilePointer);
  if (
    projectileData.isIceCream &&
    collider.Type !== EntityType.FAMILIAR &&
    collider.Type !== EntityType.PLAYER
  ) {
    const creep = spawnEffect(
      EffectVariant.CREEP_SLIPPERY_BROWN,
      0,
      collider.Position,
    );

    const creepPointer = GetPtrHash(creep);
    const creepData = v.room.iceCreamCreep.getAndSetDefault(creepPointer);
    const iceCreamColor = projectile.GetColor();

    creepData.isIceCream = true;
    creepData.iceCreamColor = iceCreamColor;

    return undefined;
  }
}

export function checkHasItem(tear: Entity, player: EntityPlayer): void {
  const tearPointer = GetPtrHash(tear);
  const tearData = v.room.iceCreamTears.getAndSetDefault(tearPointer);
  const rng = RNG();
  rng.SetSeed(getRandomSeed(), 1);

  if (
    !tearData.isIceCream &&
    player.HasCollectible(CollectibleTypeCustom.DROPPED_ICE_CREAM) &&
    rng.RandomInt(101) <= 10
  ) {
    applyEffect(tear, tearData, player, rng);
  }
}

function applyEffect(
  tear: Entity,
  tearData: DroppedIceCreamData,
  player: EntityPlayer,
  rng: RNG,
) {
  let velocity = tear.Velocity;
  if (tear.Type === EntityType.LASER) {
    velocity = player.GetShootingInput().mul(player.ShotSpeed * 10);
  }
  const firedTear = player.FireTear(
    player.Position,
    velocity,
    false,
    false,
    false,
    undefined,
    1.5,
  );

  const colors = [
    Color(0.62, 0.81, 0.56),
    Color(0.95, 0.81, 0.64),
    Color(0.51, 0.33, 0.27),
  ];

  tearData.isIceCream = true;
  const colorIndex = rng.RandomInt(3);
  const color = colors[colorIndex];
  if (color !== undefined) {
    firedTear.SetColor(color, 0, 1);
  }
}

export function changeCreepColor(effect: EntityEffect): void {
  const creepPointer = GetPtrHash(effect);
  const creepData = v.room.iceCreamCreep.getAndSetDefault(creepPointer);
  if (creepData.isIceCream) {
    const newCreepColor = Color(1, 1, 1);
    newCreepColor.SetColorize(
      creepData.iceCreamColor.R * 4,
      creepData.iceCreamColor.G * 4,
      creepData.iceCreamColor.B * 4,
      1,
    );
    const creepSprite = effect.GetSprite();
    creepSprite.Color = newCreepColor;
  }
}
