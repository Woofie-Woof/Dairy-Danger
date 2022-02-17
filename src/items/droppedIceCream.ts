import { CollectibleTypeCustom } from "../constants";

if (EID !== undefined) {
  const itemDescription =
    "↑ +0.5 Tears up#10% chance while firing to shoot an ice cream shot#Ice cream shot: 1.5x damage and creates slippery creep on impact";
  EID.addCollectible(
    CollectibleTypeCustom.COLLECTIBLE_DROPPED_ICE_CREAM,
    itemDescription,
  );
}

export function checkHasItem(tear: EntityTear, player: EntityPlayer): void {
  const tearData = tear.GetData();
  if (
    tearData.iceCream === undefined &&
    player !== undefined &&
    player.HasCollectible(
      CollectibleTypeCustom.COLLECTIBLE_DROPPED_ICE_CREAM,
    ) &&
    math.random(100) <= 10
  ) {
    applyEffect(tear, player);
  }
}

function applyEffect(tear: EntityTear, player: EntityPlayer) {
  const firedTear = player.FireTear(
    player.Position,
    tear.Velocity,
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
    firedTear.SetColor(colors[math.random(3) - 1], 0, 1);
  }
}
