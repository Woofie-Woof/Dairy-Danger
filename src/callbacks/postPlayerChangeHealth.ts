import { HealthType } from "isaacscript-common";
import { CollectibleTypeCustom } from "../constants";
import * as darkChocolate from "../items/darkChocolate";

export function main(
  player: EntityPlayer,
  healthType: HealthType,
  amount: int,
): void {
  if (
    player.HasCollectible(CollectibleTypeCustom.DARK_CHOCOLATE) &&
    healthType !== HealthType.BLACK &&
    amount > 0
  ) {
    darkChocolate.changeHealthUp(player, amount, healthType);
  }
}
