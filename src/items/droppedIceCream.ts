import { EntityType } from "isaac-typescript-definitions";
import { getPlayerFromTear, getRandomSeed } from "isaacscript-common";
import { CollectibleTypeCustom } from "../constants";

if (EID !== undefined) {
  const itemDescription =
    "↑ +0.5 Tears up#10% chance while firing to shoot an ice cream shot#Ice cream shot: 1.5x damage and creates slippery creep on impact";
  EID.addCollectible(CollectibleTypeCustom.DROPPED_ICE_CREAM, itemDescription);
}

// ModCallbacksCustom.POST_TEAR_INIT_LATE
export function postTearInitLate(tear: EntityTear): void {
  const player = getPlayerFromTear(tear);
  if (player === undefined) {
    return;
  }

  checkHasItem(tear, player);
}

export function checkHasItem(tear: Entity, player: EntityPlayer): void {
  const tearData = tear.GetData();
  const rng = RNG();
  rng.SetSeed(getRandomSeed(), 1);

  if (
    tearData["iceCream"] === undefined &&
    player !== undefined &&
    player.HasCollectible(CollectibleTypeCustom.DROPPED_ICE_CREAM) &&
    rng.RandomInt(101) <= 10
  ) {
    applyEffect(tear, player, rng);
  }
}

function applyEffect(tear: Entity, player: EntityPlayer, rng: RNG) {
  let velocity = tear.Velocity;
  if (tear.Type === EntityType.LASER)
    velocity = player.GetShootingInput().mul(player.ShotSpeed * 10);
  const firedTear = player.FireTear(
    player.Position,
    velocity,
    false,
    false,
    false,
    undefined,
    1.5,
  );

  if (firedTear !== undefined) {
    const colors = [
      Color(0.62, 0.81, 0.56),
      Color(0.95, 0.81, 0.64),
      Color(0.51, 0.33, 0.27),
    ];

    const tearData = firedTear.GetData();
    tearData["iceCream"] = true;
    const colorIndex = rng.RandomInt(3);
    const color = colors[colorIndex];
    if (color !== undefined) firedTear.SetColor(color, 0, 1);
  }
}
