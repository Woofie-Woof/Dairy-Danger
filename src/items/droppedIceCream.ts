import { CollectibleTypeCustom } from "../constants";

if (EID !== undefined) {
  const itemDescription =
    "↑ +0.5 Tears up#10% chance while firing to shoot an ice cream shot#Ice cream shot: 1.5x damage and creates slippery creep on impact";
  EID.addCollectible(
    CollectibleTypeCustom.COLLECTIBLE_DROPPED_ICE_CREAM,
    itemDescription,
  );
}

export function checkHasItem(tear: Entity, player: EntityPlayer): void {
  const tearData = tear.GetData();
  const rng = RNG();
  rng.SetSeed(Random(), 1);

  if (
    tearData.iceCream === undefined &&
    player !== undefined &&
    player.HasCollectible(
      CollectibleTypeCustom.COLLECTIBLE_DROPPED_ICE_CREAM,
    ) &&
    rng.RandomInt(101) <= 10
  ) {
    applyEffect(tear, player, rng);
  }
}

function applyEffect(tear: Entity, player: EntityPlayer, rng: RNG) {
  let velocity = tear.Velocity;
  if (tear.Type === EntityType.ENTITY_LASER)
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
    tearData.iceCream = true;
    const colorIndex = rng.RandomInt(3);
    firedTear.SetColor(colors[colorIndex], 0, 1);
  }
}
